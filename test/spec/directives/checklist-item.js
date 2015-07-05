'use strict';

describe('Directive: checklistItem', function () {

  // load the directive's module
  beforeEach(module('checkItApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    scope.item = {
      text: 'First Item'
    };
    element = angular.element('<checklist-item item=></checklist-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the checklistItem directive');
  }));
});
