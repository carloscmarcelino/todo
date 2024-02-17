import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { useDeleteTask } from '@/home/api';
import { TasksResponse } from '@/home/api/types';
import { FormType } from '@/home/validators/formSchema';

type DeleteTaskModalProps = {
  id: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<TasksResponse, unknown>>;
  handleSubmit: UseFormHandleSubmit<FormType>;
};

export const DeleteTaskModal = ({ id, refetch, handleSubmit }: DeleteTaskModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useDeleteTask();

  const onSubmit = () => {
    mutate(id, {
      onSuccess: async () => {
        await refetch();
        onClose();
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} variant="@unstyled" p="0">
        <FaTrash />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold" color="black">
            Deletar
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja excluir essa tarefa?</Text>
          </ModalBody>

          <ModalFooter gap="1rem">
            <Button variant="secondary">Cancelar</Button>

            <Button type="submit" isLoading={isLoading} variant="primary">
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
