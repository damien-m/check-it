'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('checkItApp'));

  var MainCtrl, localStorage;

  describe("With an empty localStorage object", function(){
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
      localStorage = {};
      MainCtrl = $controller('MainCtrl', {
        $localStorage: localStorage
      });
    }));

    it('starts with an empty set of items', function () {
      expect(MainCtrl.items.length).toBe(0);
    });

    it('adds an item to the list', function() {
      MainCtrl.newItemText = "My First Item";
      MainCtrl.addItem();

      expect(MainCtrl.items.length).toBe(1);
    });

    it('resets the newItem object when item added', function(){
      MainCtrl.newItemText = "Added";
      MainCtrl.addItem();

      expect(MainCtrl.newItemText).toEqual('');
    });

    it("doesn't allow blank text to be added", function(){
      MainCtrl.newItem = {text: ''};
      MainCtrl.addItem();
      expect(MainCtrl.items.length).toBe(0);
    });

    it('removes an item from the array at given index', function() {
      // FIXME: This passes with a changed api...
      MainCtrl.addItem({text: "An Item"});
      MainCtrl.removeItem(0);

      expect(MainCtrl.items.length).toBe(0);
    });

    it('saves the list to localStorage', function(){
      var itemText = "Local Storage 1";
      MainCtrl.newItemText = itemText;
      MainCtrl.addItem();
      MainCtrl.saveItems();
      expect(localStorage.items[0].text).toEqual(itemText);
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
