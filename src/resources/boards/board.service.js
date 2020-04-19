const taskService = require('../tasks/task.memory.repository');

const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const createBoard = board => boardsRepo.createBoard(board);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = async id => {
  const tasks = await taskService.getAll();

  const responses = await Promise.all([
    ...tasks
      .filter(item => item.boardId === id)
      .map(item => taskService.deleteTask(item.id)),
    boardsRepo.deleteBoard(id)
  ]);

  return responses[responses.length - 1];
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
