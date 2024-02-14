import dayjs from 'dayjs';

let tasks = [];

export const getAllTasks = (_, res) => {
  res.json(tasks);
};

export const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));

  res.status(200).json(task);
};

export const createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Title is required!' });
    return;
  }

  const newTask = {
    title,
    id: tasks.length + 1,
    created_at: dayjs().toISOString(),
    completed: false,
  };

  tasks.push(newTask);

  res.json(newTask);
};

export const updateTask = (req, res) => {
  const { title, completed } = req.body;
  const { id } = req.params;

  const updatedTasks = tasks.map((task) => {
    if (task.id === Number(id)) {
      return { ...task, title, completed };
    }

    return task;
  });

  tasks = updatedTasks;

  res.json(tasks);
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  const remainingTasks = tasks.filter((task) => task.id !== Number(id));

  tasks = remainingTasks;

  res.json(tasks);
};
