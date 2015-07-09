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
      MainCtrl.newItem = {
        title: "My First Item",
        text: "Lorem Ipsum"
      };

      MainCtrl.addItem();

      expect(MainCtrl.items.length).toBe(1);
    });

    it('resets the newItem object when item added', function(){
      MainCtrl.newItem = {
        title: "Added",
        text: "Lorem"
      };

      MainCtrl.addItem();

      expect(MainCtrl.newItem).toEqual({title: '', text: ''});
    });

    it("doesn't allow blank text to be added", function(){
      MainCtrl.newItem = {
        title: '',
        text: ''
      };
      MainCtrl.addItem();
      expect(MainCtrl.items.length).toBe(0);
    });

    it('removes an item from the array at given index', function() {
      // FIXME: This passes with a changed api...
      MainCtrl.addItem({text: "An Item"});
      MainCtrl.removeListItem(0);

      expect(MainCtrl.items.length).toBe(0);
    });

    it('saves the list to localStorage', function(){
      var itemText = "Local Storage 1";
      MainCtrl.newItem = {
        title: itemText,
        text: "Lorem"
      };

      MainCtrl.addItem();
      MainCtrl.saveItems();
      expect(localStorage.items[0].title).toEqual(itemText);
    });
  });

  describe("With a filled localStorage Object", function() {
    beforeEach(inject(function($controller) {
      var filledLocalStorage = {
        items : [{
          title: "LS Item 1",
          text: "Lorem 1"
        },{
          title: "LS Item 2",
          text: "Lorem 2"
        }]
      };

      MainCtrl = $controller('MainCtrl', {
        $localStorage: filledLocalStorage
      });
    }));

    it('retrieves an item from localstorage on load', function(){
      expect(MainCtrl.items[0].title).toBe("LS Item 1");
    });
  });
});
