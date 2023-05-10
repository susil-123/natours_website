const express = require('express');
const app = express();
app.use(express.json());
const AppError = require(`${__dirname}/utils/AppError`);
const globalErrorHandler = require(`${__dirname}/controller/errorController`);
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant get the url requested ${req.originalUrl}`, 404));
});

// global error handler | err middleware as having err param
app.use(globalErrorHandler);

module.exports = app;
