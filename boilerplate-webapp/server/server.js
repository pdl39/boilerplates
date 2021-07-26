const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const morgan = require('morgan');


// CREATE SERVER APP
const app = express();

// MIDDLEWARES
// logging middleware
app.use(morgan('dev'));

// static middleware
const staticAssetsPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(staticAssetsPath));

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded());


// API ROUTES
app.use('/api', require('./api/apiRoutes'));


// FALLBACK HANDLER
// send index.html as fallback
app.get('*', (req, res) => {
  const indexHtmlPath = path.resolve(__dirname, '..', 'dist', 'index.html');
  res.sendFile(indexHtmlPath);
});


// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


// START SERVER
const PORT = process.env.PORT || 3000;
const serverListenMessage = () => {
  console.log(`Server is running on PORT ${PORT}`);
}

http.createServer(app).listen(80, serverListenMessage);
https.createServer(app).listen(443, serverListenMessage);
