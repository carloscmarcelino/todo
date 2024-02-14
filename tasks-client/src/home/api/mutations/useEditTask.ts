import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { editTask } from '../endpoints';

export const useEditTask = () => {
  const toast = useToast();

  return useMutation({
    mutationKey: ['edit-task'],
    mutationFn: editTask,
    onSuccess: () => {
      toast({
        description: 'Tarefa editada com sucesso',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Ocorreu algum erro ao editar a tarefa, tente novamente mais tarde.',
        status: 'error',
      });
    },
  });
};
