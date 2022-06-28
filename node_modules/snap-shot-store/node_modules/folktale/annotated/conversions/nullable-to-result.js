'use strict';

var __metamagical_withMeta = function metamagical_withMeta(object, meta) {
  var parent = Object.getPrototypeOf(object);var oldMeta = object[Symbol.for('@@meta:magical')] || {};if (parent && parent[Symbol.for('@@meta:magical')] === oldMeta) {
    oldMeta = {};
  }Object.keys(meta).forEach(function (key) {
    if (/^~/.test(key)) {
      oldMeta[key.slice(1)] = meta[key];
    } else {
      oldMeta[key] = meta[key];
    }
  });object[Symbol.for('@@meta:magical')] = oldMeta;return object;
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../result/result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a:
 *     (a or None) => Result None a
 */


var nullableToResult = __metamagical_withMeta(function (a) {
  return a != null ? Ok(a) : /*else*/Error(a);
}, {
  'name': 'nullableToResult',
  'source': '(a) =>\n  a != null ? Ok(a)\n  :/*else*/   Error(a)',
  'signature': 'nullableToResult(a)',
  'location': {
    'filename': 'source/conversions/nullable-to-result.js',
    'start': {
      'line': 22,
      'column': 0
    },
    'end': {
      'line': 24,
      'column': 23
    }
  },
  'module': 'folktale/conversions/nullable-to-result',
  'licence': 'MIT',
  'authors': ['@boris-marinov'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a:\n  (a or None) => Result None a\n'
});

module.exports = nullableToResult;