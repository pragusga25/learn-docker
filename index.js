const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

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

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      // maxAge: 60 * 1000 * 30,
      maxAge: 15000,
    },
  })
);

app.enable('trust proxy');
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send(
    `<h1>Hello Dunia</h1> <p>Listening on port ${port}</p> <p>I'm in ${process.env.NODE_ENV}</p>`
  );
});

app.get('/flag', (_, res) => {
  res.send(`This is your flag: ${flag}`);
});

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
