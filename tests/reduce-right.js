(function () {
  'use strict';

  var reduceRightAsync = require('../array-async').reduceRightAsync
    ;

  console.log('index', 'result', 'current', 'result + current');
  reduceRightAsync([0, 1, 2, 3, 4], function (next, result, element, index) {
    // test that reduceRight reduces to the right
    function conquer() {
      console.log(index, result, element, result + element);
      next(result + element);
    }

    // test that semi-asynchrity doesn't flamboozel anything
    setTimeout(conquer, element);
  }).then(function (result) {
    // test that result carries
    console.log(result);
  });
}());
