'use strict';

/**
 * @ngdoc function
 * @name checkItApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the checkItApp
 */
angular.module('checkItApp')
  .controller('MainCtrl', function ($scope, $localStorage) {
    this.items = $localStorage.items || [];

    this.addItem = function addItem(item) {
      this.items.push(item);
    };

    this.removeItem = function removeItem(index) {
      this.items.splice(index, 1);
    };

    this.saveItems = function saveList(){
      this.localStorage = this.items;
    };

  });
