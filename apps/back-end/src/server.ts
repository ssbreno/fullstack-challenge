import 'reflect-metadata'
import fastify from 'fastify';
import fastifyExpress from 'fastify-express';
import mongoose from 'mongoose';
import { logger } from './shared/loggers/logger';
import { initializeControllers } from './shared/utils/controller-init';
import * as dotenv from 'dotenv'
import { HealthCheckController } from './application/health-check/controllers/health-check.controller';
import { EmployeeController } from './application/employee/controllers/employee.controller';


dotenv.config()

const server = fastify()
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/tech';


const startServer = async () => {
  await server.register(fastifyExpress)

  const controllers = [
    HealthCheckController,
    EmployeeController
  ]

  initializeControllers(server, controllers)

  try {
    await server.listen({ port: 3000 })
    mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected');
        logger.info('Database connected');
    })
    .catch(err => {
        console.error(err);
        logger.error('Database connection error:', err);
    });
    server.log.info(`Server listening on 3000`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()