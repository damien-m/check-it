'use strict';

/**
 * @ngdoc directive
 * @name checkItApp.directive:checklistItem
 * @description
 * # checklistItem
 */
angular.module('checkItApp')
  .directive('checklistItem', function () {
    return {
      templateUrl: '../template/checklist-item.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text("THIS IT");
      }
    };
  });
