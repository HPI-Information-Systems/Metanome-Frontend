'use strict';

angular.module('Metanome')
  .factory('CountResults', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/result-store/count/:type', {}, {
        get: {
          method: 'GET',
          params: {
            type: '@type'
          }
        }
      });
    }
  ])

;
