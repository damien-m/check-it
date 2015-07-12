'use strict';

/**
 * @ngdoc function
 * @name checkItApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the checkItApp
 */
angular.module('checkItApp')
  .controller('MainCtrl', function ($localStorage) {
    this.items = $localStorage.items || [];
    this.newItem = {
      title: '',
      text: ''
    };
    this.editable = false;

    this.notSaved = function notSaved() {
      return this.items.length && !$localStorage.items;
    };

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

    this.removeAllItems = function removeAllItems() {
      $localStorage.items = this.items = [];
      this.editable = false;
    };

    this.saveItems = function saveList(){
      $localStorage.items = this.items;
    };

    this.toggleEditable = function toggleEditable() {
      this.editable = !this.editable;
    };
  });
