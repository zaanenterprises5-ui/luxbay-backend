require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const setupDB = require('./utils/db');

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

  // ✅ FIXED PORT
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `${chalk.green('✓')} ${chalk.blue(
        `Server running on port ${PORT}`
      )}`
    );
  });
};

startServer();