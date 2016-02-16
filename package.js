Package.describe({
  name: 'jbastnagelmt:app-notifications',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Meteor In-App Notifications',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/inkadnb/meteor-app-notifications',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');
  //api.use("useraccounts:core");
  //api.use("accounts-password");
  //api.use("useraccounts:bootstrap");
  //api.use("kadira:flow-router");
  api.use('reactive-var');
  api.use('blaze-html-templates');
  api.use('mongo');
  api.use("kadira:blaze-layout@2.3.0");
  api.addFiles('app-notifications-shared.js');
  api.addFiles('app-notifications-server.js','server');
  api.addFiles('app-notifications.html','client');
  api.addFiles('app-notifications.js','client');
  api.addFiles('app-notifications.css','client');
  api.export('NotificationHistory')
});
