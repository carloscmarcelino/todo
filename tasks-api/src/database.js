import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: 'localhost',
  database: 'todo_database',
  user: 'root',
  password: 'root',
});
