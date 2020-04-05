const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(new User(req.body));

  res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, new User(req.body));

  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  await tasksService.removeUserFromTasks(req.params.id);

  res.status(200).send('user deleted');
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  console.log(user);
  res.status(200).json(User.toResponse(user));
});

module.exports = router;
