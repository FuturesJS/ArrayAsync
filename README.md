ArrayAsync
===

v3.x - Diet Cola Edition

ArrayAsync provides asynchronous counterparts for each of the Array iterate methods

  * `forEachAsync`
  * `everyAsync`
  * `someAsync`
  * `filterAsync`
  * `mapAsync`
  * `reduceAsync`
  * `reduceRightAsync`\* (uses reversed copy of original array)

Each of the other array methods is a thin (12-line long) wrapper around the
diet (27-line long) [`forEachAsync`](https://github.com/FuturesJS/forEachAsync),
which is the core workhorse.

Where size is a concern and you don't need all 86 lines of code,
I would invite you to simply look at the source and copy/paste
what you need (and attribute, of course).

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

```javascript
(function () {
  'use strict';

  var ArrayAsync = require('async-array').filterAsync
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

Different Names for the Same Thing
===

I'm not sure which is the clear win yet:

Call each \*Async function as needed
```javascript
  var mapAsync = require('array-async').mapAsync
    ;
```

Use them attached to ArrayAsync object
```javascript
  var ArrayAsync = require('array-async').ArrayAsync
    ;

  // Access each without the trailing 'Async'
  ArrayAsync.reduce(arr, fn);
```

Attach the async methods to Array
```javascript
  require('array-async').infect(Array);

  Array.filterAsync(array, fn);
```

I've been the prototype route before... it was a bad idea.
