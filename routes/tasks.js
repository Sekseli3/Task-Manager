const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', (req, res) => {
  Task.find({}).then(tasks => {
    res.json(tasks);
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const task = new Task({
    content: body.content,
    important: body.important || false,
  });

  task.save().then(savedTask => {
    res.json(savedTask);
  });
});

router.delete('/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      console.log(error);
      res.status(400).send({ error: 'malformatted id' });
    });
});

router.put('/:id', (req, res) => {
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

module.exports = router;