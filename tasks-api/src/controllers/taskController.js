import dayjs from 'dayjs';
import { connection } from '../database.js';

export const getAllTasks = (_, res) => {
  connection.query('SELECT * FROM todo', (error, result) => {
    if (error) {
      throw new Error(error);
    }

    const items = result.map((result) => ({
      ...result,
      completed: !!result.completed,
    }));

    res.json({
      items: items ?? [],
      totalItems: result.length,
    });
  });
};

export const getTaskById = (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM todo WHERE id = ?', [id], (error, result) => {
    if (error) {
      throw new Error(error);
    }

    res.json({ ...result?.[0], completed: !!result?.[0].completed });
  });
};

export const createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Title is required!' });
    return;
  }

  const newTask = {
    title,
    created_at: dayjs().toISOString(),
    completed: false,
  };

  connection.query('INSERT INTO todo SET ?', [newTask], (error, result) => {
    if (error) {
      throw new Error(error);
    }

    res.status(201).json({
      items: { ...newTask, id: result.insertId },
      totalItems: result.length,
    });
  });
};

export const updateTask = (req, res) => {
  const { title, completed } = req.body;
  const { id } = req.params;

  if (!title) {
    res.status(400).json({ message: 'Title is required!' });
    return;
  }

  if (typeof completed !== 'boolean') {
    res.status(400).json({ message: 'Completed is required!' });
    return;
  }

  connection.query('SELECT * FROM todo WHERE id = ?', [id], (error, result) => {
    if (error) {
      throw new Error(error);
    }

    if (!result.length) {
      res.status(404).json({ message: 'Task not found!' });
    } else {
      connection.query(
        'UPDATE todo SET title = ?, completed = ? WHERE id = ?',
        [title, completed, id],
        (error) => {
          if (error) {
            throw new Error(error);
          }

          res.json({
            title,
            completed,
          });
        },
      );
    }
  });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM todo WHERE id = ?', [id], (error, result) => {
    if (error) {
      throw new Error(error);
    }

    if (result.affectedRows > 0) {
      res.json({ message: 'Task deleted with success!' });
    } else {
      res.status(404).json({ message: 'Task not found!' });
    }
  });
};
