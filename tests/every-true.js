(function () {
  'use strict';

  var everyAsync = require('../array-async').everyAsync
    ;

  everyAsync([300, 100, 0, 50, 75, 500], function (next) {
    // test that if we never hit false, we're truthy
    next(true);
  }, {}).then(function (truthiness) {
    // test that result and this carry
    console.log(truthiness);
  });
}());
