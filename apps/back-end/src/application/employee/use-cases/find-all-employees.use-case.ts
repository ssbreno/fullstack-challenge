import { FindAllEmployeesParams } from "../../../domain/interfaces/pagination.interface";
import Employee from "../../../domain/models/employee";

export const findAllEmployees = async ({
  page,
  limit,
  sort,
  order
}: FindAllEmployeesParams) => {
  const skip = (page - 1) * limit;
  const employees = await Employee.find()
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const totalEmployees = await Employee.countDocuments();
  return {
    employees,
    totalEmployees,
    totalPages: Math.ceil(totalEmployees / limit),
    currentPage: page
  };
};
