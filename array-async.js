/*jshint -W054 */
(function (exports) {
  "use strict";

  var forEachAsync = require('../forEachAsync/forEachAsync').forEachAsync
    ;

  function everyAsync(arr, fn, thisArg) {
    function everyFn(next, e, i, a) {
      function everyNext(value) {
        if (value) {
          next(undefined, value);
        } else {
          next(forEachAsync.__BREAK, value);
        }
      }
      fn.call(thisArg, everyNext, e, i, a);
    }
    return forEachAsync(arr, everyFn, thisArg);
  }

  function someAsync(arr, fn, thisArg) {
    function someFn(next, e, i, a) {
      function someNext(value) {
        if (value) {
          next(forEachAsync.__BREAK, value);
        } else {
          next(undefined, value);
        }
      }
      fn.call(thisArg, someNext, e, i, a);
    }
    return forEachAsync(arr, someFn, thisArg);
  }

  function filterAsync(arr, fn, thisArg) {
    var newArr = []
      ;

    function filterFn(next, e, i, a) {
      function filterNext(value) {
        if (value) {
          newArr.push(e);
        }
        next(undefined, newArr);
      }
      fn.call(thisArg, filterNext, e, i, a);
    }
    return forEachAsync(arr, filterFn, thisArg);
  }

  function mapAsync(arr, fn, thisArg) {
    var newArr = []
      ;

    function mapFn(next, e, i, a) {
      function mapNext(value) {
        newArr.push(value);
        next(undefined, newArr);
      }
      fn.call(thisArg, mapNext, e, i, a);
    }
    return forEachAsync(arr, mapFn, thisArg);
  }

  function reduceAsync(arr, fn, thisArg) {
    var result = null
      ;

    function reduceFn(next, e, i, a) {
      function reduceNext(value) {
        result = value;
        next(undefined, result);
      }
      fn.call(thisArg, reduceNext, result, e, i, a);
    }
    return forEachAsync(arr, reduceFn, thisArg);
  }

  function reduceRightAsync(arr, fn, thisArg) {
    // How to best follow the principle of least surprise here?
    return reduceAsync(arr.slice(0).reverse(), fn, thisArg);
  }

  exports.forEachAsync = forEachAsync;
  exports.everyAsync = everyAsync;
  exports.someAsync = someAsync;
  exports.filterAsync = filterAsync;
  exports.mapAsync = mapAsync;
  exports.reduceAsync = reduceAsync;
  exports.reduceRightAsync = reduceRightAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));
