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
      templateUrl: '/scripts/templates/checklist-item.html',
      restrict: 'E',
      scope: {
        item: '=',
        editable: '=',
        index: '=',
        remove: '&',
        completed: '&'
      },
      link: function postLink(scope, element) {
        var checkbox = angular.element(element.find('input'));

        checkbox.on('click', function(){
          scope.item.checked = !scope.item.checked;
          scope.completed({index: scope.index});
        });
      }
    };
  });
