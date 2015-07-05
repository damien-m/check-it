'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('checkItApp'));

  var MainCtrl, scope;

  describe("With an empty localStorage object", function(){
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      var localStorage = {};
      MainCtrl = $controller('MainCtrl', {
        // place here mocked dependencies
        $scope: scope,
        $localStorage: localStorage
      });
    }));

    it('starts with an empty set of items', function () {
      expect(MainCtrl.items.length).toBe(0);
    });

    it('adds an item to the list', inject(function() {
      MainCtrl.addItem({text: "My First Item", completed: false});

      expect(MainCtrl.items.length).toBe(1);
    }));

    it('removes an item from the array at given index', inject(function() {
      MainCtrl.addItem({text: "An Item"});
      MainCtrl.removeItem(0);

      expect(MainCtrl.items.length).toBe(0);
    }));

    it('saves the list to localStorage', inject(function(){
      var item = {text: "Local Storage 1"};
      MainCtrl.addItem(item);
      MainCtrl.saveItems();
      expect(MainCtrl.localStorage[0].text).toEqual(item.text);
    }));
  });

  describe("With a filled localStorage Object", function() {

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      var filledLocalStorage = {
        items : [{text: "LS Item 1"}, {text: "LS Item 2"}]
      };

      MainCtrl = $controller('MainCtrl', {
        $scope: scope,
        $localStorage: filledLocalStorage
      });
    }));

    it('retrieves an item from localstorage on load', inject(function(){
      expect(MainCtrl.items[0].text).toBe("LS Item 1");
    }));
  });
});
