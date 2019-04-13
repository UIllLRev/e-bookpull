/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ebookpull',
    environment: environment,
    rootURL: '/members/bookpull/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    "@sentry/ember": {
      sentry: {
        dsn: 'https://14dda427f59c4ec68fbe4a4a93998506@sentry.io/110958',
        environment,
        beforeSend: function (event) {
          if (event.exception) {
            Sentry.showReportDialog();
          }

          return event;
        }
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  /*if (environment === 'production') {

  }*/

  return ENV;
};
