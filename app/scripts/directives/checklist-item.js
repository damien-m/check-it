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
      // TODO: Use templateURL
      templateUrl: '/scripts/templates/checklist-item.html',
      restrict: 'E',
      scope: {
        item: '=',
        editable: '='
      },
      link: function postLink(scope, element) {
        var checkbox = angular.element(element.find('input'));

        checkbox.bind('click', function(){
          scope.item.checked = !scope.item.checked;
        });
      }
    };
  });
