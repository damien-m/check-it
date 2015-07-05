'use strict';

describe('Directive: checklistItem', function () {

  // load the directive's module
  beforeEach(module('checkItApp'));

  var element,
    elementDOM,
    scope,
    compileDirective;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    elementDOM = angular.element('<checklist-item item="checkListItem"></checklist-item>');

    compileDirective = function compileDirective(element, scope){
      var compiled = $compile(element)(scope);
      scope.$apply();
      return compiled;
    };
  }));

  it('shows the element text', inject(function () {
    scope.checkListItem = {
      text: 'First Item'
    };
    element = compileDirective(elementDOM, scope);

    expect(element.text()).toBe('First Item');
  }));

  it('toggles `completed` class when clicked', inject(function(){
    scope.checkListItem = {
      completed: false
    };
    element = compileDirective(elementDOM, scope);
    var wrapperElement = angular.element(element.find('div')[0]);
    scope.checkListItem.completed = true;
    scope.$apply();
    
    expect(wrapperElement.hasClass('completed')).toBe(true);
  }));
});
