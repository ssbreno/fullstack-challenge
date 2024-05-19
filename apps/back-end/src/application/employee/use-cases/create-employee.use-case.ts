import Employee from "../../../domain/models/employee";
import { EmployeeType } from "../../../domain/validators/employee.validator";

export const createEmployee = async (data: EmployeeType) => {
  const newEmployee = new Employee(data);
  return await newEmployee.save();
};
