# Fullstack Challenge

![image](https://github.com/ssbreno/fullstack-challenge/assets/8092325/48bb5093-e871-4f9f-9af6-0b4f84176753)


## Introduction

Fullstack challenge: Develop a simple administrative dashboard where users can manage a list of employees, including creating, reading, updating, and deleting employee records.

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
5. **Build Front-End**: Execute `yarn` to start the app.
6. **Start the Application**: In root folder, run `yarn run be:dev` and `yarn run fe:dev`

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

### Conclusion

<img width="597" alt="image" src="https://github.com/ssbreno/fullstack-challenge/assets/8092325/c674fdd8-379a-4dee-9814-53f5d3f058db">
