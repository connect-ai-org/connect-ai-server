const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const getDatabase = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.DATABASE_DEV.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );
    case 'production':
      return process.env.DATABASE_PROD.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );
    case 'local':
      return process.env.DATABASE_LOCAL.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );
    default:
      return process.env.DATABASE_LOCAL.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );
  }
};

const DB = getDatabase();
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('DB connection successfully');
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}...`);
});
