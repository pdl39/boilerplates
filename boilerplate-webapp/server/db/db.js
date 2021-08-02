const Sequelize = require('sequelize');

// DB config
const config = {
  logging: false
}

if (process.env.LOGGING === true) delete config.logging;
if (process.env.NODE_ENV === 'production') {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

// new DB
const db = new Sequelize(process.env.DATABASE_URL, config);

module.exports = db;
