const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);

const createTask = task => tasksRepo.createTask(task);

const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);

const updateTask = (id, task) => tasksRepo.updateTask(id, task);

const deleteTask = id => tasksRepo.deleteTask(id);

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

const removeUserFromTasks = userId => tasksRepo.removeUserFromTasks(userId);

module.exports = {
  getAllByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  removeUserFromTasks
};
