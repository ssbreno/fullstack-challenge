import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { EmployeeSchema } from "../../../domain/validators/employee.validator";
import { createEmployee } from "../use-cases/create-employee.use-case";
import { deleteEmployee } from "../use-cases/delete-employee.use-case";
import { findAllEmployees } from "../use-cases/find-all-employees.use-case";
import { findEmployeeById } from "../use-cases/find-employee-by-id.usecase";
import { updateEmployee } from "../use-cases/update-employee.use-case";
import { logger } from '../../../shared/loggers/logger'

export class EmployeeController {
  constructor(private server: FastifyInstance) {
    this.server.get('/api/employees', this.getAllEmployees.bind(this));
    logger.warn('[GET] /api/employees')
    this.server.get('/api/employees/:id', this.getEmployeeById.bind(this));
    logger.warn('[GET] /api/employees/id')
    this.server.post('/api/employees', this.createEmployee.bind(this));
    logger.warn('[POST] /api/employees')
    this.server.put('/api/employees/:id', this.updateEmployee.bind(this));
    logger.warn('[PUT] /api/employees/:id')
    this.server.delete('/api/employees/:id', this.deleteEmployee.bind(this));
    logger.warn('[DELETE] /api/employees/:id')
  }

  private async getAllEmployees(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const querySchema = z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      sort: z.string().default('name'),
      order: z.enum(['asc', 'desc']).default('asc')
    });

    try {
      const { page, limit, sort, order } = querySchema.parse(request.query);
      const result = await findAllEmployees({ page, limit, sort, order });
      reply.send(result);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  private async getEmployeeById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const employee = await findEmployeeById(id);
      reply.send(employee);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  private async createEmployee(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const employeeData = EmployeeSchema.parse(request.body);
      const newEmployee = await createEmployee(employeeData);
      reply.status(201).send(newEmployee);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  private async updateEmployee(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const employeeData = EmployeeSchema.partial().parse(request.body);
      const updatedEmployee = await updateEmployee(id, employeeData);
      reply.send(updatedEmployee);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  private async deleteEmployee(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      await deleteEmployee(id);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}
