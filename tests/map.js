(function () {
  'use strict';

  var mapAsync = require('../array-async').mapAsync
    ;

  mapAsync([301, 105, 7, 52, 77, 500], function (next, element, i) {
    // test that thisness happens
    this[i] = element;

    // test that map maps
    function conquer() {
      next({
        quotient: Math.floor((element / 5))
      , remainder: (element % 5)
      });
    }

    // test that semi-asynchrity doesn't flamboozel anything
    if (element % 2) {
      conquer();
    } else {
      setTimeout(conquer, element);
    }
  }, {}).then(function (newArr) {
    // test that result and thisness carry
    this.selected = newArr;
    console.log(this);
  });
}());
