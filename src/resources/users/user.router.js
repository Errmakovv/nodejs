const router = require('express').Router();
const User = require('./user.model');
const notFoundError = require('../../common/notFoundError');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const errorCatcher = require('../../common/errorCatcher');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const user = await usersService.createUser(new User(req.body));

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const user = await usersService.updateUser(
      req.params.id,
      new User(req.body)
    );

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    await tasksService.removeUserFromTasks(req.params.id);

    res.status(200).send('user deleted');
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (!user) throw new notFoundError('User not found');
    res.status(200).json(User.toResponse(user));
  })
);

module.exports = router;
