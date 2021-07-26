const Sequelize = require('sequelize');

const dbName = 'boilerplatewebapp';
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
  }
);

try {
  await db.authenticate();
  console.log('Connection to the database has been successfully established.');
}
catch (err) {
  console.error('Failed to connect to databse: ', err);
}

module.exports = db;
