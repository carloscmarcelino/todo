import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { useGetAllTasks } from '../api';
import { CreateTaskModal, TaskBox } from '../components';

export const HomeScreen = () => {
  const { data, refetch } = useGetAllTasks();

  return (
    <Flex flexDirection="column" width="20rem" m="2rem auto" minH="100vh" alignItems="center">
      <Text fontWeight="bold" color="black">
        Tarefas
      </Text>

      <Flex flexDirection="column" m="1rem">
        {data?.items?.map((task) => (
          <TaskBox key={task.id} task={task} refetch={refetch} />
        ))}
      </Flex>

      <CreateTaskModal refetch={refetch} />
    </Flex>
  );
};
