const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const notFoundError = require('./common/notFoundError');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { body, query, url, params } = req;
  console.log(
    `url:${url}\nquery parameters:${JSON.stringify(
      query
    )}\nbody:${JSON.stringify(body)}\nparams:${JSON.stringify(params)}`
  );

  // eslint-disable-next-line callback-return
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

// eslint-disable-next-line handle-callback-err
app.use((err, req, res, next) => {
  console.error(`captured error: ${err.message}`);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send('Internal Server Error');
  next();
});

module.exports = app;
