import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import * as Sentry from '@sentry/browser';

let release = document.querySelector("meta[name='sentry:revision']").attributes.content;

Sentry.init({
    dsn: 'https://14dda427f59c4ec68fbe4a4a93998506@sentry.io/110958',
    integrations: [new Sentry.Integrations.Ember()],
    release: release !== undefined ? release.value : '',
    environment: config.environment,
    beforeSend: function (event) {
        if (event.exception) {
            Sentry.showReportDialog({subtitle: "Matt Loar has been notified."});
        }

        return event;
    }
});

let App;

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  Sentry
});

loadInitializers(App, config.modulePrefix);

export default App;
