const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const morgan = require('morgan');

// CREATE SERVER APP
const app = express();


// MIDDLEWARES
// logging middleware (in non-testing environment)
if (process.env.NODE_ENV !== 'testing') app.use(morgan('dev'));

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

module.exports = app;
