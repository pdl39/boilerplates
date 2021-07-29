const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// CREATE SERVER APP
const app = express();


// MIDDLEWARES

// In development environment, tell express to use the webpack-dev-middleware and use webpack.dev.js config file as a base.
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackDevConfig = require('../webpack.dev');
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
  }));
}

// logging middleware (in non-testing environment)
if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));

// static middleware
const staticAssetsPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(staticAssetsPath));

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// API ROUTES
app.use('/api', require('./api/apiRoutes'));


// FALLBACK HANDLER
// send index.html as fallback
app.get('*', (req, res) => {
  const indexHtmlPath = path.resolve(__dirname, '..', 'dist', 'index.html');
  if (indexHtmlPath) {
    res.sendFile(indexHtmlPath);
  }
  else {
    res.send(`<main>Fallback HTML</main>`);
  }
});


// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
