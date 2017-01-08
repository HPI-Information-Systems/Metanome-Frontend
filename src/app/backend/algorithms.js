'use strict';

angular.module('Metanome')
  .factory('Algorithms', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/algorithms/:type', {}, {
        get: {
          method: 'GET',
          params: {
            type: '@type'
          }, isArray: true
        }
      });
    }
  ])

;
