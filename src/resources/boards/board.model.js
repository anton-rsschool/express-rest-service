const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: Array,
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = user => {
  const { id, title, columns } = user;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
