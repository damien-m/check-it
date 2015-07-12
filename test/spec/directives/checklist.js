'use strict';
/* globals $ */
describe('Directive: checklist', function () {

  var scope, compileDirective, angEl, element;

  beforeEach(module('checkItApp'));
  beforeEach(module('dir-templates'));

  beforeEach(inject(function($rootScope, $compile, directiveHelpers) {
    scope = $rootScope.$new();
    compileDirective = directiveHelpers.compile;
    angEl = directiveHelpers.wrapElement;
  }));

  describe("When not editable", function(){
    beforeEach(function(){
      var testItems = [
        { title: 'One', text: 'Lorem 1'},
        { title: 'Two', text: 'Lorem 2'},
        { title: 'Three', text: 'Lorem 3'}
      ];
      scope.items = testItems;
      scope.editable = false;

      element =
        compileDirective('<checklist items="items" editable="editable" />', scope);
    });

    it("renders a list with a couple of items", function(){
      var listItems = $(element).find('checklist-item');

      expect(listItems.length).toBe(3);
    });

    it('shows the footer', function(){
      var footerElement = $(element).find('.checklist-footer');
      expect(footerElement.length).toBe(1);
    });

  });

  describe('When editable', function(){
    var controller;

    beforeEach(function(){
      var testItems = [
        { title: 'One', text: 'Lorem 1'},
        { title: 'Two', text: 'Lorem 2'},
        { title: 'Three', text: 'Lorem 3'}
      ];
      scope.items = testItems;
      scope.editable = true;

      element =
        compileDirective('<checklist items="items" editable="editable" />', scope);
      controller = element.controller('checklist');
    });

    it('shows the header for adding items', function(){
      var headerElement = $(element).find('.checklist-header');
      expect(headerElement.length).toBe(1);
    });

    it('shows the edit button in the footer', function(){
      var footerEditButton = $(element).find('.checklist-footer .edit-list');
      expect(footerEditButton.length).toBe(1);
    });

    it('creates a new item object for adding items', function(){
      expect(controller.newItem).toBeDefined();
    });

    it('adds a new item', function(){
      controller.newItem = {title: 'Adding', text: 'An item'};
      controller.addItem();
      scope.$apply();

      var listItems = $(element).find('checklist-item');
      expect(listItems.length).toBe(4);
    });

    it('resets the newItem object when item added', function(){
      controller.newItem = {
        title: "Added",
        text: "Lorem"
      };

      controller.addItem();
      expect(controller.newItem).toEqual({title: '', text: ''});
    });

    it("doesn't allow blank text to be added", function(){
      controller.newItem = {
        title: '',
        text: ''
      };
      controller.addItem();
      expect(controller.items.length).not.toBe(4);
    });

    it('removes an item', function(){
      var newItem = {
        title: "A Title",
        text: "An Item",
        $$hashkey: "_HASHKEY_"
      };
      controller.newItem =  newItem;
      controller.addItem();
      controller.removeListItem(newItem);

      expect(controller.items.length).not.toBe(4);
    });

    it('removes all from the list', function() {
      controller.updateable = true;
      controller.removeAllItems();
      expect(controller.items.length).toBe(0);
    });

    it('removing all sets updateable to be false', function() {
      controller.removeAllItems();
      expect(controller.updateable).toBe(false);
    });

  });
});
