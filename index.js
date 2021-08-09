const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const flag = process.env.FLAG || 'CTFTC{REDACTED}';

app.get('/', (_, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/flag', (_, res) => {
  res.send(`This is your flag: ${flag}`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
