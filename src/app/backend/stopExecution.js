'use strict';

angular.module('Metanome')
  .factory('StopExecution', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/algorithm-execution/stop/:identifier', {}, {
        stop: {
          method: 'POST',
          params: {
            identifier: '@identifier'
          }
        }
      });
    }
  ])

;
