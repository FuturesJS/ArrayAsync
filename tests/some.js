(function () {
  'use strict';

  var someAsync = require('../array-async').someAsync
    ;

  someAsync([300, 100, 0, 50, 75, 500], function (next, element, i) {
    // test that thisness happens
    this[i] = element;

    // test that when we hit true, we stop
    if ((element / 5) % 2) {
      next(true);
      return;
    }
    next();
  }, {}).then(function (truthiness) {
    // test that result and this carry
    this.truthiness = truthiness;
    console.log(this);
  });
}());
