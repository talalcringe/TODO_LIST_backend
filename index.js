const express = require('express');
const mongoose = require('mongoose');
// const Task = require('./models/task.model');

const taskRoute = require('./routes/tasks.route');

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', taskRoute);

const MONGO_URI = process.env.MONGO_URI;

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello from node');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(
      'Please connect to an internet that allows accessing mongoDB :)'
    );
  });

// app.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/tasks', async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.patch('/tasks/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     const updatedTask = await Task.findById(id);
//     res.status(200).json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/tasks/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.findByIdAndDelete(id);

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
