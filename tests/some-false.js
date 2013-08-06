(function () {
  'use strict';

  var someAsync = require('../array-async').someAsync
    ;

  someAsync([300, 100, 0, 50, 75, 500], function (next, element, i) {
    // test that thisness happens
    this[i] = element;

    console.log('.');
    setTimeout(function () {
      // test that when we never hit true, we're falsey
      next(false);
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
