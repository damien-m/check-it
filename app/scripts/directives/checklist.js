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
      controller: function checklistController() {
        this.updateable = false;

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

        this.removeListItem = function removeListItem(item) {
          var listIndex = this.items.map(function(listItem, index) {
              if(listItem.$$hashkey === item.$$hashkey) {
                return index;
              }
          });

          if(listIndex) {
            this.items.splice(listIndex, 1);
            $localStorage.items = this.items;
          }
        };

        this.removeAllItems = function removeAllItems(){
          $localStorage.items = this.items = [];
          this.updatable = false;
        };

        this.toggleUpdatable = function toggleUpdatable() {
          this.updateable = !this.updateable;
        };
      }
    };
  });
