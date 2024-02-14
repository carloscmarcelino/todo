import axiosObject from '@/lib/axios';

import { CreateTaskBody, EditTaskBody, Task } from './types';

export const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await axiosObject.get('/tasks');

  return data;
};

export const createTask = async (params: CreateTaskBody): Promise<Task[]> =>
  await axiosObject.post('/tasks', params);

export const deleteTask = async (id: number): Promise<Task[]> =>
  await axiosObject.delete(`/tasks/${id}`);

export const editTask = async ({ id, body }: EditTaskBody): Promise<Task[]> =>
  await axiosObject.put(`/tasks/${id}`, body);
