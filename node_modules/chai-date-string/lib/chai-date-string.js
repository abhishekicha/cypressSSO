'use strict';

module.exports = (_chai, utils) => {
  let Assertion = _chai.Assertion;

  function assertDateString(options) {
    var obj = this._obj;

    this.assert(
        isValidDateString(obj)
      , 'expected #{this} to be a date string'
      , 'expected #{this} to not be a date string'
      , obj
    );
  }

  Assertion.addMethod('dateString', assertDateString);
};

function isValidDateString(str) {
  let d = new Date(str);

  if (Object.prototype.toString.call(d) === "[object Date]") {
    if (isNaN(d.getTime())) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}
