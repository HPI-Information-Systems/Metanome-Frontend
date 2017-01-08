'use strict';

angular.module('Metanome')
  .factory('AlgorithmExecution', ['$resource', 'ENV_VARS',
    function ($resource, ENV_VARS) {
      return $resource(ENV_VARS.apiURL + '/api/algorithm-execution', {}, {
        run: {
          method: 'POST'
        }
      });
    }
  ])

;
