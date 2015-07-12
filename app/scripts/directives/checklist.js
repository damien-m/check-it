'use strict';

/**
 * @ngdoc directive
 * @name checkItApp.directive:checklist
 * @description
 * # checklist
 */
angular.module('checkItApp')
  .directive('checklist', function() {
    return {
      templateUrl: '/scripts/templates/checklist.html',
      scope: {
        items: '=',
        editable: '='
      },
      bindToController: true,
      controllerAs: 'checklist',
      controller: function checklistController($scope) {
        if($scope.editable) {
          $scope.newItem = {
            title: '',
            text: ''
          };
        }
      }
    };
  });
