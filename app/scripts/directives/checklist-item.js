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
      template: '<div class="checklist-item">{{item.text}}</div>',
      restrict: 'E',
      scope: {
        item: '='
      },
      link: function postLink(scope, element) {}
    };
  });
