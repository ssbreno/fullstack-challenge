import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import fastify from 'fastify';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { EmployeeController } from './application/employee/controllers/employee.controller';
import { HealthCheckController } from './application/health-check/controllers/health-check.controller';
import { logger } from './shared/loggers/logger';
import { initializeControllers } from './shared/utils/controller-init';


dotenv.config()

const server = fastify()
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/tech';


const startServer = async () => {
  await server.register(cors)

  const controllers = [
    HealthCheckController,
    EmployeeController
  ]

  initializeControllers(server, controllers)

  try {
    await server.listen({ port: 3001 })
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