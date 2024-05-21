import { z } from 'zod';

export const EmployeeSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório"
  }).min(1, "Nome é obrigatório"),
  position: z.string({
    required_error: "Cargo é obrigatório"
  }).min(1, "Cargo é obrigatório"),
  department: z.string({
    required_error: "Departamento é obrigatório"
  }).min(1, "Departamento é obrigatório"),
  salary: z.string({
    required_error: "Salário é obrigatório"
  }).refine((value) => !Number.isNaN(parseInt(value, 10)), {
    message: "Salário precisa ser um valor numérico"
  })
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
