const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const process = require('process')
require('dotenv').config()


const url =process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const taskSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
const Task = mongoose.model('Task', taskSchema)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/tasks', (req, res) => {
  Task.find({}).then(tasks => {
    res.json(tasks);
  })
})
app.get('/', (req, res) => {
    res.send('<h1>Lets get this working!</h1>')
  })
app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        if (task) {
          res.json(task);
        } else {
          res.status(404).end();
        }
      })
      .catch(error => {
        console.log(error);
        res.status(400).send({ error: 'malformatted id' });
      });
  });

app.post('/tasks', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const task = new Task({
    content: body.content,
    important: body.important || false,
  })

  task.save().then(savedTask => {
    res.json(savedTask);
  })
})

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(204).end();
      })
      .catch(error => {
        console.log(error);
        res.status(400).send({ error: 'malformatted id' });
      });
  });
  
  app.put('/tasks/:id', (req, res) => {
    const body = req.body;
  
    const task = {
      content: body.content,
      important: body.important,
    };
  
    Task.findByIdAndUpdate(req.params.id, task, { new: true })
      .then(updatedTask => {
        res.json(updatedTask);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send({ error: 'malformatted id' });
      });
  });
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})