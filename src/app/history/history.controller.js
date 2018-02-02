'use strict';

var app = angular.module('Metanome')

  .config(function config($stateProvider) {
    $stateProvider
      .state('history', {
        url: '/history',
        views: {
          'main@': {
            controller: 'HistoryCtrl',
            templateUrl: 'app/history/history.html'
          }
        }
      })
  });

app.controller('HistoryCtrl', function ($scope, $log, Executions, $filter, $location, ngDialog, $timeout, Delete, StopExecution, usSpinnerService) {

  // ** VARIABLE DEFINITIONS **
  // **************************

  $scope.content = [];

  $scope.historyTable = {
    count: 0,
    query: {
      order: '',
      limit: 10,
      page: 1
    },
    params: {
      sort: 'date',
      from: 0,
      to: 10
    }
  };

  // ** FUNCTION DEFINITIONS **
  // **************************

  /**
   * Formats the given number. The number should contain two digits.
   * @param number the number
   * @returns {string} a string containig two digits
   */
  function twoDigits(number) {
    return (number < 10 ? '0' + number : '' + number)
  }

  /**
   * Loads the execution from the backend.
   */
  function loadExecutions() {
    console.log("loading");
    Executions.getAll({}, function (result) {
      $scope.content = [];

      result.forEach(function (execution) {
        // get the input names
        var inputs = [];
        execution.inputs.forEach(function (input) {
          input.name = input.name.replace(/^.*[\\\/]/, '');
          inputs.push(input.name)
        });
        console.log("resultType");
        // get the result types
        var results = [];
        if (execution.algorithm.basicStat === true) {
          results.push("Basic Statistics")
        }
        if (execution.algorithm.ucc === true) {
          results.push("Unique Column Combination")
        }
        if (execution.algorithm.cucc === true) {
          results.push("Conditional Unique Column Combination")
        }
        if (execution.algorithm.ind === true) {
          results.push("Inclusion Dependency")
        }
        if (execution.algorithm.fd === true) {
          results.push("Functional Dependency")
        }
        if (execution.algorithm.od === true) {
          results.push("Order Dependency")
        }
        if (execution.algorithm.mvd === true) {
          results.push("Multivalued Dependency")
        }
        if (execution.algorithm.dc === true) {
          results.push("Denial Constraint")
        }
        if (execution.algorithm.md === true) {
          results.push("Matching Dependency")
        }
        if (execution.aborted) {
          results.push('EXECUTION ABORTED')
        }
        console.log("loading");

        // calculate execution time
        var duration = execution.end - execution.begin;
        if (execution.end === 0) {
          duration = 0
        }

        var days = Math.floor(duration / (1000 * 60 * 60 * 24));
        var hours = twoDigits(Math.floor(duration / (1000 * 60 * 60)));
        var minutes = twoDigits(Math.floor((duration / (1000 * 60)) % 60));
        var seconds = twoDigits(Math.floor((duration / 1000) % 60));
        var milliseconds = Math.floor(duration % 1000);

        var executionTimeStr;
        if (seconds === '00') {
          executionTimeStr = milliseconds + ' ms';
        } else if (days === 0) {
          executionTimeStr = hours + ':' + minutes + ':' + seconds + ' (hh:mm:ss) and ' + milliseconds + ' ms';
        } else {
          executionTimeStr = days + ' day(s) and ' + hours + ':' + minutes + ':' + seconds + ' (hh:mm:ss) and ' + milliseconds + ' ms';
        }

        // push the execution to the content array
        $scope.content.push({
          id: execution.id,
          name: execution.algorithm.name,
          date: $filter('date')(execution.begin, 'yyyy-MM-dd HH:mm:ss'),
          time: executionTimeStr,
          inputs: inputs.join(',\n'),
          resultType: results.join(', '),
          actions: '',
          aborted: execution.aborted,
          count: execution.countResult,
          cached: !execution.countResult,
          fd: execution.algorithm.fd,
          md: execution.algorithm.md,
          ind: execution.algorithm.ind,
          ucc: execution.algorithm.ucc,
          cucc: execution.algorithm.cucc,
          od: execution.algorithm.od,
          mvd: execution.algorithm.mvd,
          basicStat: execution.algorithm.basicStat,
          dc: execution.algorithm.dc,
          running: execution.running,
          identifier: execution.identifier
        })
      });
      console.log($scope.content);
      // order the executions
      var orderBy = $filter('orderBy');
      $scope.content = orderBy($scope.content, $scope.historyTable.params.sort, true);
      $scope.historyTable.count = $scope.content.length;
    })
  }

  /**
   * Switch to result page and show the result of the execution.
   * @param execution the execution
   */
  function showResult(execution) {
    console.log(execution.id);
        if (!execution.aborted) {
          $location.url('/result/' + execution.id + '?count=' + execution.count + '&cached=' + execution.cached +
          '&load=true' + '&ind=' + execution.ind + '&fd=' + execution.fd + '&md=' + execution.md + '&ucc=' + execution.ucc +
          '&cucc=' + execution.cucc + '&od=' + execution.od + '&mvd' + execution.mvd + '&basicStat=' + execution.basicStat +
          '&dc=' + execution.dc);
        }
      }

  /**
   * Start the spinner.
   */
  function startSpin() {
    $timeout(function() {
      usSpinnerService.spin('spinner-2');
    }, 100);
  }

  /**
   * Stop the spinner.
   */
  function stopSpin() {
    usSpinnerService.stop('spinner-2');
  }

  /**
   * Opens a dialog, where the user has to confirm that he wants to delete the given execution.
   * If the user confirms, the execution is deleted.
   * @param execution the execution
   */
  function confirmDelete(execution) {
        $scope.confirmText = 'Are you sure you want to delete it?';
        $scope.confirmItem = execution;

        $scope.confirmFunction = function () {
          $scope.startSpin();
          Delete.execution({id: $scope.confirmItem.id}, function () {
            $scope.loadExecutions()
          });
          $scope.stopSpin();
          ngDialog.closeAll();
        };

        ngDialog.openConfirm({
          /*jshint multistr: true */
          template: '\
                <h3>Confirm</h3>\
                <p>{{$parent.confirmText}}</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-warning" ng-click="$parent.confirmFunction(1)">Yes</button>\
                </div>',
          plain: true,
          scope: $scope
        })
      }


  /**
   * Opens a dialog, where the user has to confirm that he wants to stop the given execution.
   * If the user confirms, the execution is stopped.
   * @param execution the execution
   */
  function confirmStop(execution) {
    $scope.confirmText = 'Are you sure you want to stop the algorithm execution?';
    $scope.confirmItem = execution;

    $scope.confirmFunction = function () {
      $scope.startSpin();

      StopExecution.stop({identifier: $scope.confirmItem.identifier }, function () {
        $scope.cancelFunction();
        $scope.loadExecutions()
      });
      $scope.stopSpin();
      ngDialog.closeAll();
    };

    ngDialog.openConfirm({
                           /*jshint multistr: true */
                           template: '\
                <h3>Confirm</h3>\
                <p>{{$parent.confirmText}}</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-warning" ng-click="$parent.confirmFunction(1)">Yes</button>\
                </div>',
                           plain: true,
                           scope: $scope
                         })
  }
  // ** EXPORT FUNCTIONS **
  // **********************

  $scope.loadExecutions = loadExecutions;
  $scope.confirmDelete = confirmDelete;
  $scope.confirmStop = confirmStop;
  $scope.showResult = showResult;
  $scope.startSpin = startSpin;
  $scope.stopSpin = stopSpin;


  // ** FUNCTION CALLS **
  // ********************

  loadExecutions();
});
