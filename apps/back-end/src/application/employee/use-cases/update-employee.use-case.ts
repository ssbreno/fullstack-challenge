import Employee from "../../../domain/models/employee";
import { EmployeeType } from "../../../domain/validators/employee.validator";

export const updateEmployee = async (id: string, data: Partial<EmployeeType>) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(id, data, { new: true });
  if (!updatedEmployee) {
    throw new Error('Employee not found');
  }
  return updatedEmployee;
};
