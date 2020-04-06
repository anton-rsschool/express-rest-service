const Board = require('./board.model');

const boards = new Array(1).fill('').map(() => new Board());

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  const board = boards.find(item => item.id === id);
  return board || false;
};

const createBoard = async (board = {}) => {
  const newBoard = new Board({ ...board });
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, board) => {
  const index = boards.findIndex(item => item.id === id);
  if (index === -1) return false;
  const newBoard = new Board({ id, ...board });
  boards[index] = newBoard;
  return newBoard;
};

const deleteBoard = async id => {
  const index = boards.findIndex(item => item.id === id);
  if (index === -1) return false;
  boards.splice(index, 1);
  return true;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
