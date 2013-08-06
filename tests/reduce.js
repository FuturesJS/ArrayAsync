(function () {
  'use strict';

  var reduceAsync = require('../array-async').reduceAsync
    ;

  console.log('index', 'result', 'current', 'result + current');
  reduceAsync([0, 1, 2, 3, 4], function (next, result, element, index) {
    // test that reduce reduces
    function conquer() {
      console.log(index, result, element, result + element);
      next(result + element);
    }

    // test that semi-asynchrity doesn't flamboozel anything
    if (element % 2) {
      conquer();
    } else {
      setTimeout(conquer, element);
    }
  }).then(function (result) {
    // test that result carries
    console.log(result);
  });
}());
