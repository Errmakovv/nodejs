const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Board',
    order = 0,
    description = '',
    userId = null,
    boardId = '',
    columnId = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toColumn(task) {
    const { id, title, order } = task;
    return { id, title, order };
  }

  static toResponse(task) {
    return task;
  }
}

module.exports = Task;
