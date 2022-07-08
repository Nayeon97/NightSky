import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swaggerDoc.js';
import './config/env.js';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { passportStrategies } from './passport/finalStrategy.js';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { reportRouter } from './routers/reportRouter.js';
import { loginRouter } from './routers/loginRouter.js';
import { userRouter } from './routers/userRouter.js';
import { calendarRouter } from './routers/calendarRouter.js';
import diaryRouter from './routers/diaryRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import bookRouter from './routers/bookRouter.js';
import { challengeRouter } from './routers/challengeRouter.js';
import { afterDiaryRouter } from './routers/afterDiary.js';
import { rewardRouter } from './routers/rewardRouter.js';
import { ChallengeSchedule } from './schedule/check.js';
import { pdfRouter } from './routers/pdfRouter.js';
import { createClient } from 'redis';
import ioredis from 'ioredis';
import { default as mysqlSession } from 'express-mysql-session';
import mysql from 'mysql';

process.setMaxListeners(15);
export const app = express();

// //Redis와 MySQL Session 변환
// const redisStore = connectRedis(session);
// const redisCloud = createClient();
// redisCloud.connect().catch(console.error);
// const client = new ioredis(process.env.REDIS_URL);

// Sentry.init({
//   dsn: process.env.DSN,
//   integrations: [new Tracing.Integrations.Express({ app })],
//   tracesSampleRate: 1.0,
// });

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 1000000, // limit each IP to 100 requests per windowMs
//   delayMs: 0, // disable delaying — full speed until the max limit is reached
// });

// app.use(helmet());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // server의 url이 아닌, 요청하는 client의 url
//     credentials: true,
//   })
// );
// app.use(limiter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(compression());

// //passport
// app.use(
//   session({
//     name: "session",
//     secret: process.env.SESSION_SECRET,
//     store: new redisStore({
//       client: client,
//     }),
//     resave: false,
//     saveUninitialized: false,
//     expires: new Date(Date.now() + 60 * 30),
//   })
// );

//여기부터;
if (process.env.NODE_ENV !== 'test') {
  const mysqlStore = mysqlSession(session);
  var options = {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'sessionstore',
  };
  var connection = mysql.createConnection(options);
  var sessionStore = new mysqlStore(options, connection);
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000000, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying — full speed until the max limit is reached
});

app.use(helmet());
app.use(
  cors({
    origin: [
      'https://kdt-ai4-team12.elicecoding.com',
      'https://kdt-ai4-team12.elicecoding.com:3000/',
      'https://localhost:3000',
    ], // server의 url이 아닌, 요청하는 client의 url
    credentials: true,
  })
);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

//passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + 60 * 30),
  })
);
// //여기까지

passportStrategies();
app.use(passport.initialize());
app.use(passport.session());

//Sentry
if (process.env.NODE_ENV === 'production') {
  app.use(
    morgan('dev', {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
} else {
  app.use(morgan('dev'));
}

// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/diary', diaryRouter);
app.use('/calendar', calendarRouter);
app.use('/upload', uploadRouter);
app.use('/book', bookRouter);
app.use('/confirmed', afterDiaryRouter);
app.use('/challenge', challengeRouter);
app.use('/reward', rewardRouter);
app.use('/report', reportRouter);
app.use('/pdf', pdfRouter);

app.use(function (req, res, next) {
  res.status(404).send('존재하지 않는 페이지 입니다!');
});
// ChallengeSchedule();
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status >= 400) {
        return true;
      }
      return false;
    },
  })
);
app.use(errorMiddleware);
export default app;
