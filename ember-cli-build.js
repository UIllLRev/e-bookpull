/*jshint node:true*/
/* global require, module */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
   sassOptions: {
      includePaths: ['bower_components/material-design-lite/src']
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import(app.bowerDirectory + '/material-design-lite/material.min.js');
  app.import(app.bowerDirectory + '/dialog-polyfill/dialog-polyfill.css');
  app.import(app.bowerDirectory + '/dialog-polyfill/dialog-polyfill.js');
  app.import(app.bowerDirectory + '/raven-js/dist/raven.js');
  app.import(app.bowerDirectory + '/raven-js/dist/plugins/ember.js');

  return app.toTree();
};
