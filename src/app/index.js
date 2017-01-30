
'use strict';
angular.module('Metanome.config', []);

require('./scripts/config.js');


angular.module('Metanome', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngMaterial',
  'ngDialog',
  'schemaForm',
  'angularSpinner',
  'md.data.table',
  'timer',
  'Metanome.config'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/new');
  })
;
