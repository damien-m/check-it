'use strict';

/**
 * @ngdoc function
 * @name checkItApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Viewing Controller of the checkItApp
 */
angular.module('checkItApp')
  .controller('ViewCtrl', function($localStorage){
    this.items = $localStorage.items;
  });
