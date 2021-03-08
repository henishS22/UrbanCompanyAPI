var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cons = require('consolidate');
const bodyParser = require('body-parser');
var createError = require('http-errors');

const userRouter = require('./routes/userRoutes');
const CategoryRouter = require('./routes/categoryRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const logger = require('./middlewares/logger');

var app = express();

app.engine('html', cons.swig)
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan({'stream': logger.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', function(req, res, next) {
    res.render('index.html');
});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/service', serviceRouter);

app.use(bodyParser.urlencoded({ extended: false }));
module.exports = app;
