'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/task'),
    task = _require.task;

/*~
 * stability: experimental
 * type: |
 *   forall e, v, r:
 *     ((Any...) => Promise v e) => (Any...) => Task e v r
 */


var promisedToTask = function promisedToTask(aPromiseFn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task(function (resolver) {
      aPromiseFn.apply(undefined, args).then(function (value) {
        return resolver.resolve(value);
      }, function (error) {
        return resolver.reject(error);
      });
    });
  };
};

module.exports = promisedToTask;