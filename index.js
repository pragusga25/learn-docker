const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://pass:pass1234@mongo/?authSource=admin')
  .then(() => console.log('Successfully connected to database'))
  .catch((e) => console.error(e));

const port = process.env.PORT || 1234;

const flag = process.env.FLAG || 'CTFTC{REDACTED}';

app.get('/', (_, res) => {
  res.send(
    `<h1>Hello Dunia</h1> <p>Listening on port ${port}</p> <p>I'm in ${process.env.NODE_ENV}</p>`
  );
});

app.get('/flag', (_, res) => {
  res.send(`This is your flag: ${flag}`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
