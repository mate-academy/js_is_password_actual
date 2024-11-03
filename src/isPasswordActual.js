'use strict';

const moment = require('moment');

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */
function isPasswordActual(year, month, date) {
  if (!(year && typeof year === 'number')
    || !(month && typeof month === 'number')
    || !(date && typeof date === 'number')) {
    throw new Error('inputs should be only numbers');
  }

  if (!moment([year, month - 1, date]).isValid()) {
    throw new Error('Date is invalid');
  }

  const actualDate = moment().valueOf();
  const lastEditedDate = moment([year, month - 1, date]);
  const diff = actualDate - lastEditedDate;

  const days = Math.floor(diff / (60 * 60 * 24 * 1000));

  if (days < 0) {
    throw new Error(
      'input date cannot be in the future, only today or earlier'
    );
  }

  if (days > 60) {
    return 'Immediately change the password!';
  }

  if (days > 30) {
    return 'You should change your password.';
  }

  return 'Password is actual.';
}

module.exports = isPasswordActual;
