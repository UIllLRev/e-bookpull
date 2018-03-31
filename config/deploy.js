/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
      ENV.build.environment = 'production';
      // configure other plugins for production deploy target here
      ENV['sentry'] = {
          publicUrl: 'https://illinoislawreview.org/members/bookpull',
          sentryUrl: 'https://sentry.io',
          sentryOrganizationSlug: 'illinois-law-review',
          sentryProjectSlug: 'frontend',
          sentryApiKey: 'unusedbutneverthelessrequired',
          sentryBearerApiKey: '0d38300cdb494c0e80bf2a09ce2f3b838a06d13e6a2640b9a605bf66752408c8'
      };
      ENV['scp'] = {
          nodes: [{
              username: 'ilr',
              host: 'chain-lightning.dreamhost.com',
              path: 'illinoislawreview.org/members/bookpull'
          }]
      };
  }


  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
