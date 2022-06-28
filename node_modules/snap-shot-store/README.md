# snap-shot-store

> Snapshots saved against an object

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save snap-shot-store
```

## Use

```js
const { initStore } = require('snap-shot-store')
const snapshot = initStore()
// store / check values by name
snapshot({
  name: 'foo',
  value: 1
})
// can use list of names
snapshot({
  name: ['bar', 'baz'],
  value: 2
})
// get current store object
const store = snapshot()
// store is
// {foo: 1, bar: {baz: 2}}
```

There are aliases for remembering

```js
snapshot({
  name: 'foo',
  value: 1
})
// is same as
snapshot({
  names: 'foo',
  what: 1
})
```

Can pass options to control store behavior. For example

```js
const isCI = require('is-ci')
const { initStore } = require('snap-shot-store')
const snapshot = initStore()
snapshot({
  name: 'foo',
  value: 1,
  opts: {
    ci: isCI
  }
})
// will store value locally, but not on CI
// on CI an attempt to store / change value
// will raise an exception
```

A good set of environment variables to grab and pass as `opts` is

```js
const opts = {
  show: Boolean(process.env.SNAPSHOT_SHOW),
  dryRun: Boolean(process.env.SNAPSHOT_DRY),
  update: Boolean(process.env.SNAPSHOT_UPDATE),
  ci: Boolean(process.env.CI)
}
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/snap-shot-store/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/snap-shot-store.svg?downloads=true
[npm-url]: https://npmjs.org/package/snap-shot-store
[ci-image]: https://travis-ci.org/bahmutov/snap-shot-store.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/snap-shot-store
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
