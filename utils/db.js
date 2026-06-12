require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  try {
    await mongoose.connect(database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
    return true;
  } catch (error) {
    console.error(`${chalk.red('✗')} MongoDB connection failed:`);
    console.error(error);
    throw error;
  }
};

module.exports = setupDB;
