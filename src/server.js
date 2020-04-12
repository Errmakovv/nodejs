const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
