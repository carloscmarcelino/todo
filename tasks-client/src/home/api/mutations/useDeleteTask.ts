import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { deleteTask } from '../endpoints';

export const useDeleteTask = () => {
  const toast = useToast();

  return useMutation({
    mutationKey: ['delete-task'],
    mutationFn: deleteTask,
    onSuccess: () => {
      toast({
        description: 'Tarefa deletada com sucesso',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Ocorreu algum erro ao deletar a tarefa, tente novamente mais tarde.',
        status: 'error',
      });
    },
  });
};
