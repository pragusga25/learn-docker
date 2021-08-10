const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./config/config');
const postRouter = require('./routes/postRoutes');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () =>
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to database'))
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });

connectWithRetry();

const port = process.env.PORT || 1234;

const flag = process.env.FLAG || 'CTFTC{REDACTED}';

app.use(express.json());

app.get('/', (_, res) => {
  res.send(
    `<h1>Hello Dunia</h1> <p>Listening on port ${port}</p> <p>I'm in ${process.env.NODE_ENV}</p>`
  );
});

app.get('/flag', (_, res) => {
  res.send(`This is your flag: ${flag}`);
});

app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
