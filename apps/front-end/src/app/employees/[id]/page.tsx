'use client';

import { EmployeeSchema, EmployeeType } from '@/schemas/employee.schema';
import { getEmployee, updateEmployee } from '@/services/employee';
import { Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const params = useParams<{id: string}>();
  const toast = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: {errors, isSubmitting}, setValue } = useForm<EmployeeType>({
    resolver: zodResolver(EmployeeSchema),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEmployee = async () => {
    try {
      const response: { data: EmployeeType } = await getEmployee(params.id);

      setValue('name', response.data.name);
      setValue('department', response.data.department);
      setValue('position', response.data.position);
      setValue('salary', String(response.data.salary));

    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (data: EmployeeType) => {
    try {
      await updateEmployee(params.id, {
        ...data,
        salary: Number(data.salary)
      })

      toast({
        title: "Funcionário atualizado com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      router.push('/');
    } catch (error) {
      toast({
        title: "Erro ao atualizar funcionário.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchEmployee();
  }, [params.id, fetchEmployee])

  return (
    <Container h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card minW="45vw">
        <CardHeader>
          <Heading as='h1' size='xl' noOfLines={1}>
            Editar funcionário.
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <FormControl id="name" isRequired my="2" isInvalid={!!errors.name}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" placeholder="Insira o nome." {...register('name')} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="department" isRequired my="2" isInvalid={!!errors.department}>
              <FormLabel>Departamento</FormLabel>
              <Input type="text" placeholder="Insira o departamento." {...register('department')} />
              <FormErrorMessage>
                {errors.department && errors.department.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="position" isRequired my="2" isInvalid={!!errors.position}>
              <FormLabel>Cargo</FormLabel>
              <Input type="text" placeholder="Insira o cargo." {...register('position')} />
              <FormErrorMessage>
                {errors.position && errors.position.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="salary" isRequired my="2" isInvalid={!!errors.salary}>
              <FormLabel>Salário</FormLabel>
              <Input type="number" placeholder="Insira o salário." {...register('salary')} />
              <FormErrorMessage>
                {errors.salary && errors.salary.message}
              </FormErrorMessage>
            </FormControl>
            <Button mt="4" colorScheme="blue" size="md" rounded="xl" type='submit' isLoading={isSubmitting}>Salvar</Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
