import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Маршрути
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Server is running! 🚀</h1><p>Task Manager API v1.0</p>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});