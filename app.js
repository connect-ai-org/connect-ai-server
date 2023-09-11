/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

const newClientEnquiryRouter = require('./routes/contacts/newClientEnquiryRoute');
const contactRouter = require('./routes/contacts/contactRoute');
const supportTicketRouter = require('./routes/contacts/supportTicketRoute');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/uploads`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

app.use('/api/v1/newClientEnquiries', newClientEnquiryRouter);
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/supportTickets', uploads.array('files'), supportTicketRouter);

module.exports = app;
