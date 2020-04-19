/* eslint-disable callback-return */
const router = require('express').Router({ mergeParams: true });

const Task = require('./task.model');
const tasksService = require('./task.service');
const { createError } = require('../../middlewars/errorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tasks = await tasksService.getTasksByBoard(boardId);
      res.json(tasks.map(Task.toResponse));
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const task = await tasksService.createTask({ ...req.body, boardId });
      res.json(Task.toResponse(task));
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await tasksService.getTask(id);
      if (!task) return next(createError(404));
      res.json(Task.toResponse(task));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { boardId, id } = req.params;
      const task = await tasksService.updateTask(boardId, id, req.body);
      if (!task) return next(createError(404));
      res.json(Task.toResponse(task));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDelete = await tasksService.deleteTask(id);
      if (!isDelete.deletedCount) return next(createError(404));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
