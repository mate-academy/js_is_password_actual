'use strict';

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */
function isPasswordActual(year, month, date) {
  const lastUpdateDate = new Date(year, month - 1, date);
  const currentDate = new Date();

  const diffTime = currentDate - lastUpdateDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return 'Password is actual.';
  }

  if (diffDays <= 60) {
    return 'You should change your password.';
  }

  return 'Immediately change the password!';
}

module.exports = isPasswordActual;
