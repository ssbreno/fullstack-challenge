# Fullstack Challenge


## Introduction

Fullstack challenge, Desenvolver um dashboard administrativo simples onde os usuários possam gerenciar uma lista de funcionários, incluindo a criação, leitura, atualização e exclusão de registros de funcionários.

## Technologies Used

- Docker
- Fastify (Node.js framework)
- JestJs (Testing framework)
- Mongoose (ORM for MongoDB)
- Mongo (Database)
- NextJs
- Tailwindcss
- ChakraUI
- Other Libraries: Prettier (Code formatter), ESLint (Linter)

## Requirements

- Docker and Docker Compose

## Documentation

API documentation is available at [Local API Docs](http://localhost:3001/api) once the project is running.

## Getting Started

To run the BTC-CHALLENGE project on your local machine, follow these steps:

1. **Environment Setup**: Create a `.env` file based on the provided `.env-local` template in apps/front-end and apps/back-end
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
5. **Build Front-End**: Inside apps/front-end execute `yarn` to start the app.
6. **Start the Application**: In root folder, run `yarn run be:dev` and `yarn run fe:dev`

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

### Conclusion

