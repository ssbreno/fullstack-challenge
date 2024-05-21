'use client';

import { EmployeeDTO } from '@/dtos/employee.dto';
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { MdOutlineMode, MdRemove } from 'react-icons/md';

export interface TableWidgetProps<T> {
  data: T[];
  columns: string[];
  editEmployee: (id: string) => void;
  deleteEmployee: (id: string) => void;
  isLoading: boolean;
}

export function TableWidget({ data, columns, isLoading, editEmployee, deleteEmployee }: TableWidgetProps<EmployeeDTO>) {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          {columns.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={columns.length}>Carregando...</Td>
            </Tr>
          )}
          {!isLoading && data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.name}</Td>
              <Td>{row.department}</Td>
              <Td>{row.position}</Td>
              <Td>{row.salary}</Td>
              <Td display="flex" gap={2}>
                <IconButton color="green" aria-label='Add new employee' onClick={() => editEmployee(row._id)} icon={<MdOutlineMode />} />
                <IconButton color="red" aria-label='Remove new employee' onClick={() => deleteEmployee(row._id)} icon={<MdRemove />}/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}