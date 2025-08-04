import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from './models/project.js';

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB Atlas
await mongoose.connect('mongodb+srv://sit725user:sit725pass@cluster0.0nqz3m8.mongodb.net/myprojectDB');
console.log('Connected to MongoDB Atlas');

// API route
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: 'Error fetching projects' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
