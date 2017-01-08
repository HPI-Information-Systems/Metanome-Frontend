'use strict';

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
  'Metanome.config',
  'toastr'
])
  .config(function ($stateProvider, $urlRouterProvider, $qProvider) {
    $urlRouterProvider.otherwise('/new');
    $qProvider.errorOnUnhandledRejections(false);
  })
;
