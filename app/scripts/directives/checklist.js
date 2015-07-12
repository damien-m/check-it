'use strict';

/**
 * @ngdoc directive
 * @name checkItApp.directive:checklist
 * @description
 * # checklist
 */
angular.module('checkItApp')
  .directive('checklist', function($localStorage) {
    return {
      templateUrl: '/scripts/templates/checklist.html',
      scope: {
        items: '=',
        editable: '='
      },
      bindToController: true,
      controllerAs: 'checklist',
      controller: function checklistController($scope) {
        if(this.editable){
          this.newItem = {title: '', text: ''};
        }

        this.addItem = function addItem() {
          if (this.newItem.title.length && this.newItem.text.length) {
            this.items.push({
              title: this.newItem.title,
              text: this.newItem.text,
              completed: false
            });

            this.newItem.title = '';
            this.newItem.text = '';
          }
        };
      }
    };
  });
