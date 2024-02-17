import { Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

import { useEditTask } from '@/home/api';
import { Task, TasksResponse } from '@/home/api/types';
import { FormType, formSchema } from '@/home/validators/formSchema';

import { DeleteTaskModal } from '../DeleteTaskModal';
import { EditTaskModal } from '../EditTaskModal';

type TaskBoxProps = {
  task: Task;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<TasksResponse, unknown>>;
};

export const TaskBox = ({ task, refetch }: TaskBoxProps) => {
  const { handleSubmit, register, reset } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const [checkbox, setCheckbox] = useState(task.completed);

  const { mutate, isLoading } = useEditTask();

  useEffect(() => {
    reset(task);
  }, [reset, task]);

  const onSubmit = (checked: boolean) => {
    mutate(
      { id: task.id, body: { ...task, completed: checked } },
      {
        onSuccess: async () => {
          await refetch();
        },
      },
    );
  };

  const handleChange = (checked: boolean) => {
    setCheckbox(checked);
    onSubmit(checked);
  };

  return (
    <Flex alignItems="center" justifyContent="start" gap="2rem" p="1rem">
      <input
        type="checkbox"
        value="termos"
        checked={checkbox}
        onChange={({ target: { checked } }) => {
          handleChange(checked);
        }}
        disabled={isLoading}
      />

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
