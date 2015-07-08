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

    this.removeItem = function removeItem(index) {
      this.items.splice(index, 1);
    };

    this.saveItems = function saveList(){
      $localStorage.items = this.items;
    };

    this.toggleEditable = function toggleEditable() {
      this.editable = !this.editable;
    };
  });
