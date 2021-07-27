const db = require('./db/db');
const app = require('./app');
const PORT = process.env.PORT || 3000;


const startServer = async () => {
  try {
    // TEST DB CONNECTION
    await db.authenticate();
    console.log('Connection to the database has been successfully established.');

    // SYNC DB BEFORE STARTING SERVER
    await db.sync();
    console.log('Database synced successfully.');

    // START SERVER
    const serverListenMessage = () => {
      console.log(`Server is running on PORT ${PORT}`);
    };

    app.listen(PORT, serverListenMessage);
  }
  catch (err) {
    console.log(err);
  }
};

startServer();
