import { z } from 'zod';

export const EmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  salary: z.number().min(0, "Salary must be a positive number")
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
