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
      expect(isolateScope.newItem).toBeDefined
    });

  });
});
