require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());

const startServer = async () => {
  await setupDB();
  await require('./config/passport')(app);
  app.use(routes);

  app.listen(port, '127.0.0.1', () => {
    console.log(
      `${chalk.green('✓')} ${chalk.blue(
        `Listening on port ${port}. Visit http://127.0.0.1:${port}/ in your browser.`
      )}`
    );
  });
};

startServer();
