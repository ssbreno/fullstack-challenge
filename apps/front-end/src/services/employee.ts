import { EmployeeDTO } from "@/dtos/employee.dto";
import { api } from "./api";

export const getEmployees = async () => {
  return api.get('/employees');
};

export const createEmployee = async (data: Omit<EmployeeDTO, '_id'>) => {
  return api.post('/employees', data);
};

export const updateEmployee = async (id: string, data: Omit<EmployeeDTO, '_id'>) => {
  return api.put(`/employees/${id}`, data);
};

export const deleteEmployee = async (id: string) => {
  return api.delete(`/employees/${id}`);
};

export const getEmployee = async (id: string) => {
  return api.get(`/employees/${id}`);
};