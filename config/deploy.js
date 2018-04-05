/* jshint node: true */

var gitRepoInfo = require('git-repo-info');

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    sentry: {
        publicUrl: 'https://dev.illinoislawreview.org/members/bookpull',
        repository: process.env.REPOSITORY,
        revisionKey: gitRepoInfo().sha,
        sentryUrl: 'https://sentry.io',
        sentryOrganizationSlug: 'illinois-law-review',
        sentryProjectSlug: 'frontend',
        sentryApiKey: 'unusedbutneverthelessrequired',
        sentryBearerApiKey: process.env.SENTRY_AUTH_TOKEN
    }
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
      ENV['scp'] = {
          nodes: [{
              username: 'ilr_dev',
              host: 'chain-lightning.dreamhost.com',
              path: 'dev.illinoislawreview.org/members/bookpull'
          }]
      };
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
      ENV.build.environment = 'production';
      // configure other plugins for production deploy target here
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
