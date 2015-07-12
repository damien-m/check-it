'use strict';

describe('Controller: ViewCtrl', function () {
  beforeEach(module('checkItApp'));

  var localStorage, ViewCtrl;

  it('shows a list from localStorage', inject(function($controller){
    localStorage = {
      items: [{title: "One"}]
    };

    ViewCtrl = $controller('ViewCtrl', {
      $localStorage: localStorage
    });
    expect(ViewCtrl.items.length).toBe(1);
  }));
});
