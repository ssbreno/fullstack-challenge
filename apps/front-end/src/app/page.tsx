'use client';

import { TableWidget } from '@/components/table';
import { EmployeeDTO } from '@/dtos/employee.dto';
import { deleteEmployee, getEmployees, getEmployee } from '@/services/employee';
import { Box, Button, Card, CardBody, CardHeader, Container, Heading, Input, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const toast = useToast();

  const columns = useMemo(() => ['Nome', 'Departamento', 'Cargo', 'Salário', 'Ações'], []);

  const handleNewEmployee = () => {
    router.push('/employees')
  }

  const handleEditEmployee = (id: string) => {
    router.push(`/employees/${id}`)
  }

  const handleEmployees = async () => {
    try {
      const response = await getEmployees();

      setIsLoading(false);
      setEmployees(response.data.employees);
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Erro ao buscar funcionários.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleRemoveEmployee = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteEmployee(id);
      await handleEmployees();

      toast({
        title: "Funcionário removido com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      
    } catch(err) {
      toast({
        title: "Erro ao remover funcionário.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchEmployee = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getEmployee(id);
      setIsLoading(false);
      setEmployees(response.data ? [response.data] : []);
    } catch (err) {
      setIsLoading(false);
      setEmployees([]);
      toast({
        title: "Erro ao buscar funcionário.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }


  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearchEmployee(searchTerm);
    }
  }

  const handleBlur = () => {
    handleSearchEmployee(searchTerm);
  }

  useEffect(() => {
    handleEmployees();
  }, [])

  return (
    <Container maxW="4xl" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card>
        <CardHeader>
          <Heading as='h1' size='xl' noOfLines={1}>
            Funcionários
          </Heading>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="2" justifyContent="space-between" mb="4">
            <Input
              maxW="320px"
              placeholder="Buscar funcionário"
              size="md"
              rounded="xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
            <Button colorScheme="blue" size="md" rounded="xl" onClick={handleNewEmployee}>Novo Funcionário</Button>
          </Box>
          <TableWidget 
            columns={columns}
            data={employees}
            isLoading={isLoading}
            editEmployee={handleEditEmployee}
            deleteEmployee={handleRemoveEmployee}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
