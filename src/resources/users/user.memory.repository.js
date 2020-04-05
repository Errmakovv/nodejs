let users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...users];
};

const getUserById = async id => {
  return users.find(user => user.id === id) || {};
};

const createUser = async user => {
  users.push(user);
  return user;
};

const updateUser = async (id, updatedUser) => {
  users = users.map(user => {
    if (user.id === id) return updatedUser;
    return user;
  });

  return updatedUser;
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
