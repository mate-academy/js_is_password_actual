'use strict';

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */
function isPasswordActual(year, month, date) {
  const now = new Date(Date.now());
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  const changedUTC = Date.UTC(year, month - 1, date);
  const days = Math.floor((todayUTC - changedUTC) / (1000 * 60 * 60 * 24));

  if (days > 60) {
    return 'Immediately change the password!';
  }

  if (days > 30) {
    return 'You should change your password.';
  }

  return 'Password is actual.';
}

module.exports = isPasswordActual;
