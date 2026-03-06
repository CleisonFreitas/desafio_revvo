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

Essa documentação não descreve o projeto em si; foca apenas na forma de
colocar a infraestrutura no ar.
