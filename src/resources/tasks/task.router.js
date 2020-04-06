const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getTasksByBoard(boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.createTask({ ...req.body, boardId });
    res.json(Task.toResponse(task));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.getTask(id);
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.updateTask(boardId, id, req.body);
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).send();
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const isDelete = await tasksService.deleteTask(id);
    if (isDelete) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

module.exports = router;
