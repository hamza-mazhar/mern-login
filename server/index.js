/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

const user = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use('/api', user);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
// Start your app.
mongoose
  .connect(
    `mongodb://assesment:${'admin123'}@ds133856.mlab.com:33856/assesment_user`,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('connnect successfully...');
    app.listen(port, host, async err => {
      if (err) {
        return logger.error(err.message);
      }

      // Connect to ngrok in dev mode
      if (ngrok) {
        let url;
        try {
          url = await ngrok.connect(port);
        } catch (e) {
          return logger.error(e);
        }
        logger.appStarted(port, prettyHost, url);
      } else {
        logger.appStarted(port, prettyHost);
      }
    });
  })
  .catch(err => {
    console.log('here get the error', err);
  });
