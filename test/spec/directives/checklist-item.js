'use strict';

describe('Directive: checklistItem', function () {

  // load the directive's module
  beforeEach(module('checkItApp'));

  var element,
    elementDOM,
    angEl,
    scope,
    compileDirective;

  beforeEach(module('dir-templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    elementDOM = angular.element('<checklist-item item="checkListItem" editable="editable"></checklist-item>');
    compileDirective = function compileDirective(element, scope){
      var compiled = $compile(element)(scope);
      scope.$apply();
      return compiled;
    };

    angEl = function wrappedElement(element) {
      return angular.element(element);
    };
  }));

  it('shows the element text', function () {
    scope.checkListItem = {
      title: 'First Item'
    };
    element = compileDirective(elementDOM, scope);

    var elementTitle  = angEl(element[0].querySelector('.checklist-item-title'));

    expect(elementTitle.text()).toBe('First Item');
  });

  it('toggles `completed` class when clicked', function(){
    scope.checkListItem = {
      completed: false
    };
    element = compileDirective(elementDOM, scope);
    var wrapperElement = angEl(element.find('div')[0]);
    scope.checkListItem.completed = true;
    scope.$apply();

    expect(wrapperElement.hasClass('completed')).toBe(true);
  });

  it('shows the remove button if the item is editable', function(){
    scope.editable = true;
    element = compileDirective(elementDOM, scope);
    var removeButton = element.find('button');

    expect(removeButton.length).toBe(1);
  });

  it("fires the remove function passed to it from it's parent ", function() {
    // FIXME: This is overly complicated and possibly not working...
    var parentScope = jasmine.createSpyObj('parentScope', ['removeFn']);
    var scopeItem = {title: 'Test', text: 'Lorem'};
    scope.removeFn = parentScope.removeFn;
    scope.editable = true;
    scope.checklistItem = scopeItem;

    var localDOM = '<checklist-item ' +
      'item="checkListItem" editable="editable" remove="removeFn(item)">' +
    '</checklist-item>';

    element = compileDirective(localDOM, scope);
    var removeButton = angEl(element.find('button')[0]);
    removeButton.eq(0).click();

    scope.$apply();
    expect(parentScope.removeFn).toHaveBeenCalled();
  });
});
