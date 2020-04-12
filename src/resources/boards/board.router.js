const router = require('express').Router();
const taskRouter = require('../tasks/task.router');
const Board = require('./board.model');
const Task = require('../tasks/task.model');
const errorCatcher = require('../../common/errorCatcher');
const notFoundError = require('../../common/notFoundError');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards.map(Board.toResponse));
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const board = new Board(req.body);
    board.columns.forEach(async task => {
      const createdTask = await tasksService.createTask(
        new Task({ ...task, boardId: board.id })
      );
      // eslint-disable-next-line require-atomic-updates
      task.id = createdTask.id;
    });

    const newBoard = await boardsService.createBoard(board);

    res.status(200).json(Board.toResponse(newBoard));
  })
);

router.route('/:boardId').put(
  errorCatcher(async (req, res) => {
    const board = await boardsService.updateBoard(
      req.params.boardId,
      new Board({ ...req.body, id: req.params.boardId })
    );

    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:boardId').delete(
  errorCatcher(async (req, res) => {
    await boardsService.deleteBoard(req.params.boardId);
    await tasksService.deleteBoardTasks(req.params.boardId);

    res.status(200).send('user deleted');
  })
);

router.route('/:boardId').get(
  errorCatcher(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.boardId);
    if (!board) throw new notFoundError('Board not found');
    res.status(200).json(Board.toResponse(board));
  })
);

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
