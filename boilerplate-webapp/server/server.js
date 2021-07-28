require('dotenv').config();
const db = require('./db/db');
const app = require('./app');
const { HOST, PORT } = process.env;


const startServer = async () => {
  console.log('NODE_ENV:', process.env.NODE_ENV)
  try {
    // TEST DB CONNECTION
    await db.authenticate();
    console.log('Connection to database has been successfully established.');

    // SYNC DB BEFORE STARTING SERVER
    // if in development or test mode, drop the entire database and recreate.
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
    }
    else {
      await db.sync();
    }
    console.log('Database synced successfully.');

    // START SERVER
    const serverListenMessage = () => {
      console.log(`Server is listening on ${HOST}:${PORT}\n`);
    };

    app.listen(PORT, serverListenMessage);
  }
  catch (err) {
    console.log(err);
  }
};

startServer();
