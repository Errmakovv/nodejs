let tasks = [];

const getAllByBoardId = async id => {
  return tasks.filter(task => task.boardId === id);
};

const getTaskById = async (boardId, taskId) => {
  return tasks.find(task => task.id === taskId && task.boardId === boardId);
};

const createTask = async task => {
  tasks.push(task);
  return task;
};

const updateTask = async (id, updatedTask) => {
  tasks = tasks.map(task => {
    if (task.id === id) return updatedTask;
    return task;
  });

  return updatedTask;
};

const deleteTask = async id => {
  tasks = tasks.filter(task => task.id !== id);
};

const deleteBoardTasks = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const removeUserFromTasks = async userId => {
  tasks
    .filter(task => task.userId === userId)
    .map(task => (task.userId = null));
};

module.exports = {
  getAllByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  removeUserFromTasks
};
