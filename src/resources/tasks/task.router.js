const router = require('express').Router();
const Task = require('./task.model');
const notFoundError = require('../../common/notFoundError');
const tasksService = require('./task.service');
const errorCatcher = require('../../common/errorCatcher');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const tasks = await tasksService.getAllByBoardId(req.boardId);

    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const task = await tasksService.createTask(
      new Task({ ...req.body, boardId: req.boardId })
    );

    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:taskId').put(
  errorCatcher(async (req, res) => {
    const task = await tasksService.updateTask(
      req.params.taskId,
      new Task({ ...req.body, boardId: req.boardId })
    );

    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  errorCatcher(async (req, res) => {
    await tasksService.deleteTask(req.params.taskId);

    res.status(200).send('task deleted');
  })
);

router.route('/:taskId').get(
  errorCatcher(async (req, res) => {
    const task = await tasksService.getTaskById(req.boardId, req.params.taskId);
    if (!task) throw new notFoundError('Task not found');
    res.status(200).json(Task.toResponse(task));
  })
);

module.exports = router;
