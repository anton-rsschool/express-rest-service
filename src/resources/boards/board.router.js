/* eslint-disable callback-return */
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { createError } = require('../../middlewars/errorHandler');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = await boardsService.getBoard(id);
      if (!board) throw createError(404);
      res.json(Board.toResponse(board));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = await boardsService.updateBoard(id, req.body);
      if (!board) throw createError(404);
      res.json(Board.toResponse(board));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDelete = await boardsService.deleteBoard(id, req.body);
      if (!isDelete) throw createError(404);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
