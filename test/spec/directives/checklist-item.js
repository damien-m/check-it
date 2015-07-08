'use strict';

describe('Directive: checklistItem', function () {

  // load the directive's module
  beforeEach(module('checkItApp'));

  var element,
    elementDOM,
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
  }));

  it('shows the element text', function () {
    scope.checkListItem = {
      text: 'First Item'
    };
    element = compileDirective(elementDOM, scope);

    var elementText  =
      angular.element(element[0].querySelector('.checklist-item-text'));

    expect(elementText.text()).toBe('First Item');
  });

  it('toggles `completed` class when clicked', function(){
    scope.checkListItem = {
      completed: false
    };
    element = compileDirective(elementDOM, scope);
    var wrapperElement = angular.element(element.find('div')[0]);
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
});
