'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('checkItApp'));

  var MainCtrl, localStorage;

  describe("With an empty localStorage object", function(){
    it('has an empty list of items', inject(function ($controller){
      localStorage = {};
      MainCtrl = $controller('MainCtrl', {
        $localStorage: localStorage
      });
      expect(MainCtrl.items.length).toBe(0);
    }));
  });

  describe('With items in the localStorage object', function(){
    it('has an items in the scope', inject(function ($controller){
      localStorage = {
        items: [{title: "One"}, {title: "Two"}]
      };

      MainCtrl = $controller('MainCtrl', {
        $localStorage: localStorage
      });
      expect(MainCtrl.items.length).toBe(2);
    }));
  });
});
