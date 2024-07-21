// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"

Sentry.init({
  dsn: "https://a9eecf41cf80b5c2fbabf80e163dd4e8@o4507639132454912.ingest.us.sentry.io/4507639134879744",
  tracesSampleRate: 1.0,
});