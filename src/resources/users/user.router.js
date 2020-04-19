/* eslint-disable callback-return */
const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const { createError } = require('../../middlewars/errorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await usersService.createUser(req.body);
      res.json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.getUser(id);
      if (!user) return next(createError(404));
      res.json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.updateUser(id, req.body);
      if (!user) return next(createError(404));
      res.json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDelete = await usersService.deleteUser(id);
      if (!isDelete.deletedCount) return next(createError(404));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
