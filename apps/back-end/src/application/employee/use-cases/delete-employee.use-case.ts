import Employee from "../../../domain/models/employee";

export const deleteEmployee = async (id: string) => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (!deletedEmployee) {
    throw new Error('Employee not found');
  }
  return deletedEmployee;
};
