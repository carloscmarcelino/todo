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
import React from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { CustomInput, FormWrapper } from '@/components';
import { useEditTask } from '@/home/api';
import { Task, TasksResponse } from '@/home/api/types';
import { FormType } from '@/home/validators/formSchema';

type EditTaskModalProps = {
  task: Task;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<TasksResponse, unknown>>;
  handleSubmit: UseFormHandleSubmit<FormType>;
  register: UseFormRegister<FormType>;
};

export const EditTaskModal = ({ task, refetch, handleSubmit, register }: EditTaskModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useEditTask();

  const onSubmit = (values: FormType) => {
    mutate(
      { id: task.id, body: { ...values } },
      {
        onSuccess: async () => {
          await refetch();
          onClose();
        },
      },
    );
  };

  return (
    <>
      <Button onClick={onOpen} variant="@unstyled" p="0">
        <FaEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold" color="black">
            Editar
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormWrapper label="Tarefa">
              <CustomInput register={register('title')} />
            </FormWrapper>
          </ModalBody>

          <ModalFooter gap="1rem">
            <Button variant="secondary">Cancelar</Button>

            <Button type="submit" isLoading={isLoading} variant="primary">
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
