const Board = require('./board.model');

const getAll = async () => Board.find({});

const getBoard = async id => Board.findOne({ _id: id });

const createBoard = async board => Board.create(board);

const updateBoard = async (id, board) => Board.updateOne({ _id: id }, board);

const deleteBoard = async id => Board.deleteOne({ _id: id });

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
