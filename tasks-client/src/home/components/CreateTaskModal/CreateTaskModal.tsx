import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { FormWrapper } from '@/components';
import { CustomInput } from '@/components/CustomInput';
import { useCreateTask } from '@/home/api';
import { Task } from '@/home/api/types';
import { CreateTaskType, createTaskSchema } from '@/home/validators/createTaskSchema';

type CreateTaskModalProps = {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<Task[], unknown>>;
};

export const CreateTaskModal = ({ refetch }: CreateTaskModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskType>({
    resolver: zodResolver(createTaskSchema),
  });

  const { mutate, isLoading } = useCreateTask();

  const onSubmit = (values: CreateTaskType) => {
    mutate(values, {
      onSuccess: async () => {
        await refetch();
        onClose();
        reset();
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} bg="blue" color="white">
        Criar tarefa
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormWrapper label="Todo" error={errors.title}>
              <CustomInput register={register('title')} />
            </FormWrapper>
          </ModalBody>

          <ModalFooter gap="1rem">
            <Button variant="secondary">Cancelar</Button>

            <Button type="submit" isLoading={isLoading} variant="primary">
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
