'use client';

import { EmployeeSchema, EmployeeType } from '@/schemas/employee.schema';
import { createEmployee } from '@/services/employee';
import { Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Page() {
  const toast = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<EmployeeType>({
    resolver: zodResolver(EmployeeSchema),
  });

  const onSubmit = async (data: EmployeeType) => {
    try {
      await createEmployee({
        ...data,
        salary: Number(data.salary)
      });

      toast({
        title: "Funcionário criado com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      toast({
        title: "Erro ao criar funcionário.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(error);
    }
  }

  return (
    <Container h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card minW="45vw">
        <CardHeader>
          <Heading as='h1' size='xl' noOfLines={1}>
            Criar novo funcionário
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
