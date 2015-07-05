'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('checkItApp'));

  var MainCtrl;

  describe("With an empty localStorage object", function(){
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
      var localStorage = {};
      MainCtrl = $controller('MainCtrl', {
        $localStorage: localStorage
      });
    }));

    it('starts with an empty set of items', function () {
      expect(MainCtrl.items.length).toBe(0);
    });

    it('adds an item to the list', function() {
      MainCtrl.newItem = {text: "My First Item", completed: false};
      MainCtrl.addItem();

      expect(MainCtrl.items.length).toBe(1);
    });

    it("doesn't allow blank text to be added", function(){
      MainCtrl.newItem = {text: ''};
      MainCtrl.addItem();
      expect(MainCtrl.items.length).toBe(0);
    });

    it('removes an item from the array at given index', function() {
      MainCtrl.addItem({text: "An Item"});
      MainCtrl.removeItem(0);

      expect(MainCtrl.items.length).toBe(0);
    });

    it('saves the list to localStorage', function(){
      var item = {text: "Local Storage 1"};
      MainCtrl.newItem = item;
      MainCtrl.addItem();
      MainCtrl.saveItems();
      expect(MainCtrl.localStorage[0].text).toEqual(item.text);
    });
  });

  describe("With a filled localStorage Object", function() {

    beforeEach(inject(function($controller) {
      var filledLocalStorage = {
        items : [{text: "LS Item 1"}, {text: "LS Item 2"}]
      };

      MainCtrl = $controller('MainCtrl', {
        $localStorage: filledLocalStorage
      });
    }));

    it('retrieves an item from localstorage on load', function(){
      expect(MainCtrl.items[0].text).toBe("LS Item 1");
    });
  });
});
