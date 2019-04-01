const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const istatic = require('istatic');
const i18n = require('i18n');

/**
 * Configure i18n
 */
i18n.configure({
  locales:['en', 'fr'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang'
});

/**
 * Initialize express
 */
var app = express();

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

// Define istatic in local variables
app.locals = {
  istatic: istatic.serve({ compress: false })
};

/**
 * Routes
 */
app.use('/download', require('./routes/download'));
app.use('/', require('./routes/pages'));

/**
 * 404 error page
 */
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
