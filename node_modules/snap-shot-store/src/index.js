'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const R = require('ramda')
const debug = require('debug')('snap-shot-store')
const utils = require('./utils')

function initStore (snapshots = {}) {
  la(is.object(snapshots), 'expected plain store object', snapshots)
  let currentSnapshots = R.clone(snapshots)

  return function snapShotCore (
    {
      what,
      value,
      name,
      names,
      store = R.identity,
      compare = utils.compare,
      raiser,
      comment,
      opts = {}
    } = {}
  ) {
    if (is.empty(arguments) || is.empty(arguments[0])) {
      return currentSnapshots
    }

    // a few aliases
    what = what || value
    name = name || names

    la(utils.isName(name), 'missing or invalid name', name)
    la(is.fn(compare), 'missing compare function', compare)
    la(is.fn(store), 'invalid store function', store)
    if (!raiser) {
      raiser = utils.raiseIfDifferent
    }
    la(is.fn(raiser), 'invalid raiser function', raiser)
    la(is.maybe.unemptyString(comment), 'wrong comment type', comment)

    if ('ci' in opts) {
      debug('is CI environment? %s', Boolean(opts.ci))
    }

    const setOrCheckValue = any => {
      const value = utils.strip(any)
      const expected = utils.findValue({
        snapshots: currentSnapshots,
        name,
        opts
      })
      if (expected === undefined) {
        if (opts.ci) {
          console.log('current directory', process.cwd())
          console.log('new value to save: %j', value)
          // TODO return a lens instead!
          const key = utils.fullName(name)
          throw new Error(
            'Cannot store new snapshot value\n' +
              'for spec called "' +
              name +
              '"\n' +
              'test key "' +
              key +
              '"\n' +
              'when running on CI (opts.ci = 1)\n' +
              'see https://github.com/bahmutov/snap-shot-core/issues/5'
          )
        }

        const storedValue = store(value)
        currentSnapshots = utils.storeValue({
          snapshots: currentSnapshots,
          name,
          value: storedValue,
          comment,
          opts
        })
        return storedValue
      }

      debug('found snapshot for "%s", value', name, expected)
      raiser({
        value,
        expected,
        specName: name,
        compare
      })
      return expected
    }

    if (is.promise(what)) {
      return what.then(setOrCheckValue)
    } else {
      return setOrCheckValue(what)
    }
  }
}

module.exports = {
  initStore: initStore
}
