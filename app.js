const express = require('express');

const morgan = require('morgan');

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

const newClientEnquiryRouter = require('./routes/newClientEnquiryRoute');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/newClientEnquiries', newClientEnquiryRouter);

module.exports = app;
