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
    this.newItemText = '';
    this.editable = false;

    this.addItem = function addItem() {
      if (this.newItemText.length) {

        this.items.push({
          text: this.newItemText,
          completed: false
        });

        this.newItemText = '';
      }
    };

    this.removeItem = function removeItem(index) {
      this.items.splice(index, 1);
    };

    this.saveItems = function saveList(){
      $localStorage.items = this.items;
    };

    this.toggleEditable = function toggleEditable() {
      this.editable = !this.editable;
    }

  });
