import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

const port = 8080;

app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
