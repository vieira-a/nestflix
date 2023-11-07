<p align="center">
  <h1>Nestflix</h1>
</p>

## Description

[Desafio técnico](https://github.com/MKS-desenvolvimento-de-sistemas/mks-backend-challenge)

## Autor

- [Anderson Vieira](https://linkedin.com/in/vieira-a)

## Resultado

- [Deploy](https://stormy-pig-sandals.cyclic.app/api/docs)

## Ferramentas utilizadas

- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL

## Recursos implementados

### Sistema de autenticação

> Registrar conta de usuário

- [x] Verifica se e-mail existe
- [x] Verifica se senha e confirmação de senha são iguais
- [x] Retorna 400 para dados incorretos ou não informados
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 201 em caso de sucesso
 
> Login de usuário (recebimento de token JWT)

- [x] Retorna 400 para dados incorretos ou não informados
- [x] Verifica se e-mail existe
- [x] Verifica se a senha de usuário está correta
- [x] Retorna 404 se usuário não existe (e-mail)
- [x] Retorna 401 se a senha fornecida está incorreta
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 200 em caso de sucesso
  
### C.R.U.D filmes

> Registrar filme
 
- [x] Valida token de usuário
- [x] Valida dados de entrada
- [x] Retorna 400 para dados incorretos ou não informados
- [x] Retorna 401 para token não informado
- [x] Retorna 401 para token inválido
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 201 em caso de sucesso
 
> Listar filmes
 
- [x] Valida token de usuário
- [x] Valida dados de entrada
- [x] Retorna 401 para token não informado
- [x] Retorna 401 para token inválido
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 200 em caso de sucesso
- [x] Retorna resultado paginado (10 por página)
- [x] Força resultado paginado caso não seja informado (10 por página)
- [x] Retorna o número da página
- [x] Retorna o total de itens

> Atualizar filme

- [x] Valida token de usuário
- [x] Valida dados de entrada
- [x] Retorna 401 para token não informado
- [x] Retorna 401 para token inválido
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 404 caso não encontrado
- [x] Retorna 200 e informação do objeto em caso de sucesso

> Excluir filme

- [x] Valida token de usuário
- [x] Valida dados de entrada
- [x] Retorna 401 para token não informado
- [x] Retorna 401 para token inválido
- [x] Retorna 500 se ocorre um erro interno
- [x] Retorna 404 caso não encontrado
- [x] Retorna 200 e informação do objeto em caso de sucesso

### Documentação

- [x] Documentar endpoints com Swagger

### Sistema de cache

- [x] Implementar sistema de cache com Redis para os resultados do endpoint

### Deploy

- [x] Integração com banco de dados
- [x] Integração com Redis
- [x] Fazer deploy da API

## Estrutura do projeto

```
src
├── app.module.ts
├── config
│   └── postgre.service.ts
├── main.ts
├── movie
│   ├── dto
│   │   ├── register-movie.dto.ts
│   │   └── update-movie.dto.ts
│   ├── entities
│   │   └── movie.entity.ts
│   ├── movie.controller.ts
│   ├── movie.module.ts
│   └── movie.service.ts
├── redis
│   ├── redis.module.ts
│   └── redis.service.ts
├── shared
│   ├── exceptions
│   │   └── server-error.ts
│   └── guards
│       └── auth-guard.ts
└── user
    ├── account
    │   ├── account.controller.ts
    │   ├── account.module.ts
    │   ├── account.service.ts
    │   ├── dto
    │   │   └── register.dto.ts
    │   └── entities
    │       └── register.entity.ts
    ├── signin
    │   ├── dto
    │   │   └── signin.dto.ts
    │   ├── signin.controller.ts
    │   ├── signin.module.ts
    │   └── signin.service.ts
    └── utils
        ├── bcrypt-adapter.ts
        ├── check-user-account.ts
        ├── constants.ts
        └── index.ts
```

## Testando aplicação localmente

Antes de executar a aplicação localmente:

- Certifique-se de que o [Docker](https://www.docker.com/) esteja instalado;
- Certifique-se de que o [NPM](https://www.npmjs.com/) esteja instalado;
- Certifique-se de que o [NodeJS](https://nodejs.org/en/download) esteja instalado;

1. Clone o repositório

```
git clone https://github.com/vieira-a/nestflix.git
```

2. Crie um arquivo `.env` na raiz do projeto utilizando o modelo `.env.example`

3. Crie e inicialize os containers necessários de acordo com o `docker-compose.yml`

```
docker-compose up -d
```

4. Inicialize a aplicação:

```
npm run start  
```

5. Acesso às rotas 

- API: http://localhost:3000/api

- Swagger: http://localhost:3000/api/docs

