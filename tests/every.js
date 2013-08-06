(function () {
  'use strict';

  var everyAsync = require('../array-async').everyAsync
    ;

  everyAsync([300, 100, 0, 50, 75, 500], function (next, element, i) {
    // test that thisness happens
    this[i] = element;

    setTimeout(function () {
      // test that when we hit false, we stop
      if ((element / 5) % 2) {
        next(false);
        return;
      }
      next(true);
    }, 300);
  }, {}).then(function (truthiness) {
    // test that result and this carry
    this.truthiness = truthiness;
    console.log(this);
  }).then(function () {
    // test that then chains
    console.log('all done');
  });
}());
