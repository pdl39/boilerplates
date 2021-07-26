const db = require('./db/db');
const http = require('http');
const https = require('https');
const app = require('./server');
const PORT = process.env.PORT || 3000;


const startServer = async (db = null, app = null, port = PORT) => {
  try {
    // TEST DB CONNECTION
    await db.authenticate();
    console.log('Connection to the database has been successfully established.');

    // SYNC DB BEFORE STARTING SERVER
    await db.sync();
    console.log('Database synced successfully.');

    // START SERVER
    const serverListenMessage = () => {
      console.log(`Server is running on PORT ${port}`);
    };

    http.createServer(app).listen(80, serverListenMessage);
    https.createServer(app).listen(443, serverListenMessage);
  }
  catch (err) {
    console.log(err);
  }
};

startServer(db, app, PORT);
