ArrayAsync
===

v3.x - Diet Cola Edition

Async counterparts for each of the Array methods

  * `forEachAsync`
  * `everyAsync`
  * `someAsync`
  * `filterAsync`
  * `mapAsync`
  * `reduceAsync`
  * `reduceRightAsync\*` (uses reversed copy of original array)

Each of the other array methods is a thin (12-line long) wrapper around the
diet (27-line long) [`forEachAsync`](https://github.com/FuturesJS/forEachAsync),
which is the core workhorse.

The might all work, but map, reduce, and reduceRight haven't been tested yet

Browser Installation
===

```html
<script src="https://raw.github.com/FuturesJS/forEachAsync/master/forEachAsync.js"></script>
<script src="https://raw.github.com/FuturesJS/ArrayAsync/master/array-async.js"></script>
```

```javascript
(function () {
  'use strict';

  var filterAsync = window.filterAsync
    ;

  filterAsync(['dogs', 'cats', 'octocats'], function (next, element) {
    askTheUserIfTheyLikeThis(element, function (likesIt) {
      next(likesIt);
    });
  }).then(function (newArr) {
    showTheUserThingsTheyLike(newArr);
  });
}());
```

Node Installation
===

```bash
npm install array-async
```
