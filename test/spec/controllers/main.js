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
  });
});
