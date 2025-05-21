# API Node.js com MongoDB e Prisma

Uma API RESTful desenvolvida com Node.js, Express, MongoDB e Prisma, que oferece autenticação de usuários e gerenciamento de perfis.

## 🚀 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Autenticação com JWT
- ✅ Listagem de usuários (protegida por autenticação)
- ✅ Hash de senhas com bcrypt
- ✅ Validação de dados

## 🛠️ Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Prisma** - ORM para Node.js e TypeScript
- **JWT** - Autenticação baseada em tokens
- **bcrypt** - Criptografia de senhas

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- MongoDB (local ou Atlas)
- Prisma CLI (instalado globalmente)

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/vinibotelho1998/API-Mongodb-Prisma-node.git
   cd API-Mongodb-Prisma-node
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Copie as variáveis do `.env.example` (se existir) ou defina:
     ```
     DATABASE_URL="mongodb://usuario:senha@localhost:27017/nomedobanco"
     JWT_SECRET=sua_chave_secreta_aqui
     PORT=3000
     ```

4. Gere o cliente do Prisma:
   ```bash
   npx prisma generate
   ```

5. Execute as migrações (se necessário):
   ```bash
   npx prisma migrate dev
   ```

## 🚀 Executando o projeto

```bash
# Modo de desenvolvimento
npm run dev

# Ou para produção
npm start
```

A API estará disponível em `http://localhost:3000`

## 📚 Rotas da API

### Públicas

- **POST /cadastro**
  - Cadastra um novo usuário
  - Corpo da requisição: `{ "name": "Nome", "email": "email@exemplo.com", "password": "senha123" }`

- **POST /login**
  - Autentica um usuário e retorna um token JWT
  - Corpo da requisição: `{ "email": "email@exemplo.com", "password": "senha123" }`

### Protegidas (requer token JWT no header `Authorization`)

- **GET /listar-usuarios**
  - Lista todos os usuários cadastrados (senhas são omitidas)

## 🔒 Autenticação

As rotas protegidas requerem um token JWT no header `Authorization` no formato:
```
Authorization: Bearer seu_token_jwt_aqui
```


## ✉️ Contato

Vinicius Botelho
- [GitHub](https://github.com/vinibotelho1998)
- [LinkedIn](https://www.linkedin.com/in/viniciusdb8/)

