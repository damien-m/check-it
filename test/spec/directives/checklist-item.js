'use strict';
/* globals $ */
describe('Directive: checklistItem', function () {

  // load the directive's module
  beforeEach(module('checkItApp'));

  var element,
    elementDOM,
    angEl,
    scope,
    compileDirective;

  beforeEach(module('dir-templates'));

  beforeEach(inject(function ($rootScope, directiveHelpers) {
    scope = $rootScope.$new();
    elementDOM = '<checklist-item item="checkListItem" editable="editable"></checklist-item>';
    compileDirective = directiveHelpers.compile;
    angEl = directiveHelpers.wrapElement;
  }));

  it('shows the element text', function () {
    scope.checkListItem = {
      title: 'First Item'
    };
    element = compileDirective(elementDOM, scope);

    var elementTitle  = $(element).find('.checklist-item-title');

    expect(elementTitle.text()).toBe('First Item');
  });

  it('toggles `completed` class when clicked', function(){
    scope.checkListItem = {
      completed: false
    };
    element = compileDirective(elementDOM, scope);
    var wrapperElement = $(element).find('div');
    scope.checkListItem.completed = true;
    scope.$apply();

    expect(wrapperElement.hasClass('completed')).toBe(true);
  });


  it('disables checking initially', function(){
    scope.checklistItem = {
      checkable: false
    };
    element = compileDirective(elementDOM, scope);
    var checkbox = $(element).find('.checklist-item-complete');

    expect(checkbox.prop('disabled')).toBe(true);
  });

  it('calls the completed function on the parent when checked', function(){
    var parentScope = jasmine.createSpyObj('parentScope', ['completedFn']);
    var scopeItem = {title: 'Test', text: 'Lorem', checkable: true};

    scope.completedFn = parentScope.completedFn;
    scope.editable = true;
    scope.checklistItem = scopeItem;

    var localDOM = '<checklist-item ' +
      'item="checklistItem" completed="completedFn()" index="2">' +
    '</checklist-item>';

    element = compileDirective(localDOM, scope);

    var checkbox = angEl(element.find('.checklist-item-complete')[0]);
    checkbox.triggerHandler('click');
    scope.$apply();

    expect(parentScope.completedFn).toHaveBeenCalled();
  });

  describe('when the item is editable', function() {

    beforeEach(function(){
      scope.editable = true;
    });

    it('shows the remove button if the item is editable', function(){
      element = compileDirective(elementDOM, scope);
      var removeButton = $(element).find('.remove-button');

      expect(removeButton.length).toBe(1);
    });

    it("fires the remove function passed to it from it's parent ", function() {
      var parentScope = jasmine.createSpyObj('parentScope', ['removeFn']);
      var scopeItem = {title: 'Test', text: 'Lorem'};
      scope.removeFn = parentScope.removeFn;
      scope.checklistItem = scopeItem;

      var localDOM = '<checklist-item ' +
        'item="checkListItem" editable="editable" remove="removeFn(item)">' +
      '</checklist-item>';

      element = compileDirective(localDOM, scope);
      var removeButton = $(element).find('.remove-button').get(0);
      removeButton.click();

      scope.$apply();
      expect(parentScope.removeFn).toHaveBeenCalled();
    });
  });
});
