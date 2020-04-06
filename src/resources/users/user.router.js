const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.updateUser(id, req.body);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(400).send();
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const isDelete = await usersService.deleteUser(id);
    if (isDelete) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

module.exports = router;
