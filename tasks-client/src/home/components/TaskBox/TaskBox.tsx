import { Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { Task } from '@/home/api/types';
import { FormType, formSchema } from '@/home/validators/formSchema';

import { DeleteTaskModal } from '../DeleteTaskModal';
import { EditTaskModal } from '../EditTaskModal';

type TaskBoxProps = {
  task: Task;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<Task[], unknown>>;
};

export const TaskBox = ({ task, refetch }: TaskBoxProps) => {
  const { handleSubmit, register, reset } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    reset(task);
  }, [reset, task]);

  // const { mutate } = useEditTask();

  // const onSubmit = (checked: boolean) => {
  //   setIsChecked(checked);
  //   setValue('completed', checked);
  //   mutate(
  //     { id: task.id, body: { ...task, completed: checked } },
  //     {
  //       onSuccess: async () => {
  //         await refetch();
  //       },
  //     },
  //   );
  // };

  return (
    <Flex alignItems="center" justifyContent="start" gap="2rem" p="1rem">
      <Text fontWeight="bold" color="black">
        {task.title}
      </Text>

      <Flex>
        <EditTaskModal
          task={task}
          refetch={refetch}
          handleSubmit={handleSubmit}
          register={register}
        />

        <DeleteTaskModal id={task.id} refetch={refetch} handleSubmit={handleSubmit} />
      </Flex>
    </Flex>
  );
};
