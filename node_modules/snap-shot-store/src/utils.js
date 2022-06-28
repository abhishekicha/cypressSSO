const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('snap-shot-store')
const Result = require('folktale/result')
const R = require('ramda')

const isName = R.anyPass([is.unemptyString, is.strings])
const nameLens = name =>
  is.unemptyString(name) ? R.lensProp(name) : R.lensPath(name)
const fullName = name => (is.unemptyString(name) ? name : name.join(' - '))

// TODO allow list of strings for name
function findValue ({ snapshots, name, opts = {} }) {
  la(isName(name), 'invalid name to find spec for', name)

  if (opts.update) {
    // let the new value replace the current value
    return
  }
  if (!snapshots) {
    debug('there are no snapshots to find "%s"', name)
    return
  }

  const lens = nameLens(name)
  return R.view(lens, snapshots)
  // const key = name
  // debug('key "%s"', name)
  // if (!(key in snapshots)) {
  //   return
  // }

  // return snapshots[key]
}

// given an object, and a key (or keys), and a value
// stores the value in the object
// returns a new object
function storeValue ({ snapshots, name, value, opts = {} }) {
  la(value !== undefined, 'cannot store undefined value')
  la(is.object(snapshots), 'missing snapshots object', snapshots)
  la(is.unemptyString(name) || is.strings(name), 'missing name', name)

  const lens = nameLens(name)

  if (opts.show || opts.dryRun) {
    console.log('updated snapshot "%s"', name)
    console.log(value)
  }

  if (!opts.dryRun) {
    debug('setting snapshot for name "%s"', name)
    return R.set(lens, value, snapshots)
  }

  return snapshots
}

const isValidCompareResult = is.schema({
  orElse: is.fn
})

// expected = schema we expect value to adhere to
// value - what the test computed right now
// expected - existing value loaded from snapshot
function raiseIfDifferent ({ value, expected, specName, compare }) {
  la(value, 'missing value to compare', value)
  la(expected, 'missing expected value', expected)
  la(isName(specName), 'missing spec name', specName)

  const result = compare({ expected, value })
  la(
    isValidCompareResult(result),
    'invalid compare result',
    result,
    'when comparing value\n',
    value,
    'with expected\n',
    expected
  )

  result.orElse(message => {
    debug('Test "%s" snapshot difference', fullName(specName))
    la(is.unemptyString(message), 'missing err string', message)
    console.log(message)
    throw new Error(message)
  })
}

function compare ({ expected, value }) {
  const e = JSON.stringify(expected)
  const v = JSON.stringify(value)
  if (e === v) {
    return Result.Ok()
  }
  return Result.Error(`${e} !== ${v}`)
}

// make sure values in the object are "safe" to be serialized
// and compared from loaded value
function strip (o) {
  if (is.fn(o)) {
    return o
  }
  let stringified
  try {
    stringified = JSON.stringify(o)
  } catch (e) {
    console.error('Could not stringify value')
    console.error('%j', o)
    throw e
  }

  try {
    const parsed = JSON.parse(stringified)
    return parsed
  } catch (e) {
    console.error('Could not parse value from string')
    console.error('%s', stringified)
    console.error('from value %j', o)
    throw e
  }
}

module.exports = {
  findValue,
  storeValue,
  raiseIfDifferent,
  compare,
  strip,
  isName,
  fullName
}
