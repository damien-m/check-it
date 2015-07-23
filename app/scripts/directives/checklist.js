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
      controller: function checklistController($window, $scope, $localStorage) {
        this.updateable = false;
        this.lastCompletedItem = undefined;
        this.listComplete = false;

        if(this.editable){
          this.newItem = {title: '', text: ''};
        }

        this.addItem = function addItem() {
          if (this.newItem.title.length && this.newItem.text.length) {
            var checkableItem = this.items.length === 0;

            this.items.push({
              title: this.newItem.title,
              text: this.newItem.text,
              checkable: checkableItem,
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

        this.toggleUpdateable = function toggleUpdateable() {
          this.updateable = !this.updateable;
        };

        this.createNew = function createNew() {
          //This will clear the list for now, when title is added,
          //this will create a new list altogether (with ability to switch)
          if ($window.confirm('This will delete the existing list. Is this ok?')) {
            $localStorage.items = this.items = [];
          }
        };

        this._unsetItems = function _unsetItems(index, includeIndex) {

          this.items.map(function(item, i) {
            if (i > index || includeIndex) {
              item.checkable = false;
              item.completed = false;
            }
          });
        };

        this._listComplete = function _listComplete(index) {
          return index + 1 === this.items.length && this.items[index].completed;
        };

        this.completed = function completed(index) {
          if (index > this.items.length) { return; }

          if (index < this.lastCompletedItem) {
            this._unsetItems(index);
          } else {
            if (this.items[index].completed && this.items[index+1]) {
              this.items[index + 1].checkable = true;
            } else {
              this._unsetItems(index);
            }
          }

          this.lastCompletedItem = index;
          $scope.$apply();

          if (this._listComplete(index)) {
            this.listComplete = true;
          }
        };

        this.setCompleted = function setCompleted() {
          this._unsetItems(0, true);
        };
      }
    };
  });
