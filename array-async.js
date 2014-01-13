/*jshint -W054 */
(function (exports) {
  'use strict';

  var forEachAsync = exports.forEachAsync || require('forEachAsync').forEachAsync
    , ArrayAsync
    ;

  ArrayAsync = {
    forEach: forEachAsync
  , every: function (arr, fn, thisArg) {
      function everyFn(next, e, i, a) {
        function everyNext(value) {
          if (value) {
            next(undefined, !!value);
          } else {
            next(forEachAsync.__BREAK, !!value);
          }
        }
        fn.call(thisArg, everyNext, e, i, a);
      }
      return forEachAsync(arr, everyFn, thisArg);
    }

  , some: function (arr, fn, thisArg) {
      function someFn(next, e, i, a) {
        function someNext(value) {
          if (value) {
            next(forEachAsync.__BREAK, !!value);
          } else {
            next(undefined, !!value);
          }
        }
        fn.call(thisArg, someNext, e, i, a);
      }
      return forEachAsync(arr, someFn, thisArg);
    }

  , filter: function (arr, fn, thisArg) {
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

  , map: function (arr, fn, thisArg) {
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

  , reduce: function (arr, fn, thisArg) {
      var result = arr[0]
        ;

      function reduceFn(next, e, i, a) {
        function reduceNext(value) {
          result = value;
          next(undefined, result);
        }
        fn.call(thisArg, reduceNext, result, e, i + 1, a);
      }
      return forEachAsync(arr.slice(1), reduceFn, thisArg);
    }

  , reduceRight: function (arr, fn, thisArg) {
      var result = arr[arr.length - 1]
        ;

      function reduceRightFn(next, e, i, a) {
        function reduceRightNext(value) {
          result = value;
          next(undefined, result);
        }
        fn.call(thisArg, reduceRightNext, result, e, a.length - (i + 1), a);
      }
      return forEachAsync(arr.slice(0, arr.length - 1).reverse(), reduceRightFn, thisArg);
    }
  };

  ArrayAsync.__methods = Object.keys(ArrayAsync);
  ArrayAsync.infect = function (thing) {
    ArrayAsync.__methods.forEach(function (key) {
      thing[key + 'Async'] = ArrayAsync[key];
    });
  };

  ArrayAsync.infect(exports);
  exports.ArrayAsync = ArrayAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));
