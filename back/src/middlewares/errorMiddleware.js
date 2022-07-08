import { STATUS_400_BADREQUEST, STATUS_404_NOTFOUND } from '../utils/status.js';
import * as Sentry from '@sentry/node';

export default function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  if (process.env.NODE_ENV != 'test') {
    console.log('\x1b[33m%s\x1b[0m', error);
  }
  const defaultMessage = 'ErrorMiddleware 처리';
  Sentry.captureException(`Error Middleware Catch : ${error.message}`);
  const body = {
    success: false,
    error: {
      code: STATUS_400_BADREQUEST,
      code: error.status ?? STATUS_400_BADREQUEST,
      message: error.message ?? defaultMessage,
    },
  };
  res.status(error.status ?? STATUS_400_BADREQUEST).send(body);
}
