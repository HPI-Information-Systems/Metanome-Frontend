'use strict';

angular.module('Metanome')
  .factory('LoadResults', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/result-store/:type/:id/:notDetailed', {}, {
        load: {
          method: 'POST',
          params: {
            id: '@id',
            notDetailed: '@notDetailed',
            type: 'load-execution'
          },
          isArray: true
        },
        file: {
          method: 'GET',
          params: {
            id: '@id',
            notDetailed: '@notDetailed',
            type: 'load-results'
          },
          isArray: true
        }
      });
    }
  ])

;
