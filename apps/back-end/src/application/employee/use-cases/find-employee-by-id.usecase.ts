import Employee from "../../../domain/models/employee";

export const findEmployeeById = async (id: string) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error('Employee not found');
  }
  return employee;
};
