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
      template: '<div class="checklist-item-wrapper" ng-class="{completed: item.completed}">' +
                  '<div class="checklist-item-text">{{item.text}}</div>' +
                  '<div class="checklist-item-toggler">' +
                    '<input type="checkbox" ng-model="item.completed" />' +
                  '</div>' +
                  '<div class="checklist-item-remove" ng-if="editable">' +
                    '<button class="remove-button">Remove</button>' +
                  '</div>' +
                '</div>',
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
