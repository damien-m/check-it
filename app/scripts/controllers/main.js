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
    this.newItem = {text: '', completed: false};

    this.addItem = function addItem() {
      if(this.newItem.text){
        this.items.push(this.newItem);
      }
    };

    this.removeItem = function removeItem(index) {
      this.items.splice(index, 1);
    };

    this.saveItems = function saveList(){
      this.localStorage = this.items;
    };

  });
