const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const createBoard = board => boardsRepo.createBoard(board);

const getBoardById = id => boardsRepo.getBoardById(id);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
