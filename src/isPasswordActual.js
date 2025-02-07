'use strict';

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */
function isPasswordActual(year, month, day) {
  const actualDate = new Date(Date.now()).getTime();
  const lastEditedDate = new Date(year, month - 1, day).getTime();
  const diff = actualDate - lastEditedDate;

  if (year !== Math.trunc(year) || month !== Math.trunc(month)
    || day !== Math.trunc(day) || diff < 0 || year <= 0
    || month <= 0 || day <= 0 || month > 12 || day > 31) {
    return 'Please enter a valid date';
  }

  const days = Math.floor(diff / (60 * 60 * 24 * 1000));

  if (days > 60) {
    return 'Immediately change the password!';
  }

  if (days > 30) {
    return 'You should change your password.';
  }

  return 'Password is actual.';
}

module.exports = isPasswordActual;
