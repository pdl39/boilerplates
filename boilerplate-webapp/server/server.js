const express = require('express');
const morgan = require('morgan');
const path = require('path');


// CREATE SERVER APP
const app = express();

// SET UP MIDDLEWARES
// logging middleware
app.use(morgan('dev'));

// static middleware
const staticAssetsPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(staticAssetsPath));

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded());

// API routes
app.use('/api', require('./api/apiRoutes'));

// send index.html as fallback
app.get('*', (req, res) => {
  const indexHtmlPath = path.resolve(__dirname, '..', 'dist', 'index.html');
  res.sendFile(indexHtmlPath);
});
