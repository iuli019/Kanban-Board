import * as Sentry from "@sentry/browser";
function init() {
  Sentry.init({
    dsn:
      "https://4d060625a6c2473ba0da1b53d8e7847e@o412560.ingest.sentry.io/5289601",
  });
}

function log(error) {
  Sentry.captureEvent(error);
}

export default {
  init,
  log,
};
