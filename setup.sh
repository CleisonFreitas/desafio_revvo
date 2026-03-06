#!/usr/bin/env bash
# Setup script for project.
# * ensures .env exists and is populated interactively
# * brings up docker-compose stack if available
# * creates database/user and imports schema

set -euo pipefail

# create .env from example and prompt for values if necessary
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created from .env.example"
    echo "You will now be asked to provide configuration values."
    prompt() {
        local varname="$1"
        local prompt_text="$2"
        local default="$3"
        read -rp "$prompt_text [$default]: " val
        val=${val:-$default}
        if grep -q "^$varname=" .env; then
            sed -i "s|^$varname=.*|$varname=$val|" .env
        else
            echo "$varname=$val" >> .env
        fi
        export $varname="$val"
    }
    prompt DB_HOST "Database host" db
    prompt DB_PORT "Database port" 3306
    prompt DB_DATABASE "Database name" desafio
    prompt DB_USERNAME "Database user" desafio_user
    prompt DB_PASSWORD "Database password" desafio_pass
    prompt MYSQL_ROOT_PASSWORD "MySQL root password" secret
    prompt MYSQL_USER "MySQL app user" desafio_user
    prompt MYSQL_PASSWORD "MySQL app password" desafio_pass
fi

# load vars from .env
export $(grep -v '^#' .env | xargs)
DB_NAME=${DB_DATABASE}
DB_USER=${DB_USERNAME}
DB_PASS=${DB_PASSWORD}
ROOT_PASS=${MYSQL_ROOT_PASSWORD}

# helper: run MySQL command in container or local
run_mysql() {
    if command -v docker >/dev/null 2>&1; then
        docker exec -i desafio_revvo_db mysql -u root -p"${ROOT_PASS}" -e "$1"
    else
        mysql -u root -p"${ROOT_PASS}" -e "$1"
    fi
}

if command -v docker >/dev/null 2>&1; then
    echo "Ensuring Docker containers are running..."
    docker-compose up -d --build
    sleep 5
    echo "Configuring root password inside container..."
    # try directly and fall back to skip-password
    if ! docker exec -i desafio_revvo_db mysql -u root -p"${ROOT_PASS}" -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${ROOT_PASS}';" 2>/dev/null; then
        docker exec -i desafio_revvo_db mysql -u root --skip-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${ROOT_PASS}';" || true
    fi
    echo "Creating database and user inside container..."
    run_mysql "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
    run_mysql "CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASS}';"
    run_mysql "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%'; FLUSH PRIVILEGES;"
    echo "Importing schema..."
    docker exec -i desafio_revvo_db mysql -u root -p"${ROOT_PASS}" ${DB_NAME} < database.sql
    echo "Setup complete (Docker)."
else
    echo "Docker not found; attempting local MySQL commands."
    run_mysql "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
    run_mysql "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
    run_mysql "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost'; FLUSH PRIVILEGES;"
    mysql -u root -p"${ROOT_PASS}" ${DB_NAME} < database.sql
    echo "Setup complete (local MySQL)."
fi
