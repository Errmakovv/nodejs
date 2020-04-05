let boards = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...boards];
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  boards.push(board);
  return board;
};

const updateBoard = async (id, updatedBoard) => {
  boards = boards.map(board => {
    if (board.id === id) return updatedBoard;
    return board;
  });

  return updatedBoard;
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
