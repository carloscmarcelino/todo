import { useQuery } from 'react-query';

import { getAllTasks } from '../endpoints';

export const useGetAllTasks = () => useQuery({ queryKey: ['get-all-tasks'], queryFn: getAllTasks });
