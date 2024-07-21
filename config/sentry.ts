import * as Sentry from '@sentry/nestjs';

export default () => ({
  init: () => {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  },
});
