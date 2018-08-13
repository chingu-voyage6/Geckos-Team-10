const express = require('express')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

const app = express()
const port = (process.env.PORT || 5000)

const index = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static('static'));
app.use('/', express.static(path.join(__dirname, '../build')))
app.use('/api', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).json({
      message: err.message,
      error: err
  });
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`)
})
