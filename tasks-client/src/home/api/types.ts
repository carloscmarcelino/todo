export type Task = { title: string; id: number; created_at: string; completed: boolean };

export type CreateTaskBody = { title: string };

export type EditTaskBody = { id: number; body: Task };
