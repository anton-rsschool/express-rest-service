const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

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
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getBoard(id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.updateBoard(id, req.body);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(400).send();
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const isDelete = await boardsService.deleteBoard(id, req.body);
    if (isDelete) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

module.exports = router;
