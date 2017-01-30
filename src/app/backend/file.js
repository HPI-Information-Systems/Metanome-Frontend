'use strict';

angular.module('Metanome')
  .factory('File', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/file-inputs/get/:id', {}, {
        get: {
          method: 'GET',
          params: {
            id: '@id'
          }
        }
      });
    }
  ])
;
