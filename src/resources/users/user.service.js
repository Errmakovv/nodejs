const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const createUser = user => usersRepo.createUser(user);

const getUserById = id => usersRepo.getUserById(id);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
