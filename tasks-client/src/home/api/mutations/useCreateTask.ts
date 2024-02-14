import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { createTask } from '../endpoints';

export const useCreateTask = () => {
  const toast = useToast();

  return useMutation({
    mutationKey: ['create-task'],
    mutationFn: createTask,
    onSuccess: () => {
      toast({
        description: 'Tarefa criada com sucesso',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Ocorreu algum erro ao criar a tarefa, tente novamente mais tarde.',
        status: 'error',
      });
    },
  });
};
