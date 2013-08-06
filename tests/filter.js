(function () {
  'use strict';

  var filterAsync = require('../array-async').filterAsync
    ;

  filterAsync([300, 105, 0, 50, 75, 500], function (next, element, i) {
    // test that thisness happens
    this[i] = element;

    // test that we grab the elements we want
    if ((element / 5) % 2) {
      next(element);
      return;
    }
    next();
  }, {}).then(function (newArr) {
    // test that result and this carry
    this.selected = newArr;
    console.log(this);
  });
}());
