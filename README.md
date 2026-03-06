## Desafio Revvo
Plataforma de cursos Leo.

## Tecnologias Utilizadas

- **Docker** (opcional, mas recomendado para PHP + MySQL)
- **PHP 8+** (API em puro PHP orientado a objetos)
- **MySQL** (banco de dados relacional)
- **Node.js** (para build front-end via Gulp)

## Rodando o setup

O repositório inclui um script `setup.sh` que cuida de:

1. Copiar `.env.example` para `.env` e solicitar ao usuário os valores de
   conexão (host, usuário, senha, etc.).
2. Subir os containers Docker (`php` e `mysql`) se Docker estiver disponível.
3. Criar o banco de dados e usuário (dentro do contêiner ou localmente).
4. Importar a estrutura da tabela `cursos` com colunas em português.

### Com Docker (padrão)

```bash
# basta executar no diretório do projeto
./setup.sh
```

## Inicialização do Front-end

O script `setup.sh` já executa automaticamente os seguintes comandos:

```bash
npm install
npm start

> ⚠️ **Importante:** execute o script com seu usuário normal, **sem** `sudo`.
> Se você rodar como root o binário `docker` pode não estar no PATH e o
> script passará a rodar comandos `mysql` localmente, gerando mensagens
> como:
>
> ```txt
> mysql: [Warning] Using a password on the command line interface can be insecure.
> ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
> ```
>
> Caso veja esse aviso, pare a execução e verifique se o Docker está
> instalado e ativo. Em seguida execute `./setup.sh` novamente com seu
> usuário normal.


O script iniciará `docker-compose` automaticamente e fará os passos
adicionais.

### Sem Docker

Caso não exista o binário `docker` no sistema, o script assume que você
já possui um servidor MySQL rodando localmente. Ele ainda pedirá as
credenciais e executará os comandos SQL diretamente.

> **OBS:** você deve ter o cliente `mysql` instalado para a opção local.


## Observações sobre o .env

O arquivo `.env.example` é mantido vazio para que não vaze informações
no controle de versão. O `setup.sh` copia este modelo para `.env` e
preenche as variáveis a partir das respostas do usuário.

Após a execução do script, `.env` conterá as configurações necessárias
para a aplicação PHP conectar ao banco.

---