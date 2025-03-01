'use strict';



/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */

const dateNow = new Date(Date.now());

const today = {
  year: dateNow.getUTCFullYear(),
  month: dateNow.getMonth() + 1,
  date: dateNow.getDate(),
};

const { date, month, year } = today;

function isPasswordActual(year, month, date) {
  const actualDate = new Date(Date.now()).getTime();
  const lastEditedDate = new Date(year, month - 1, date).getTime();
  const diff = actualDate - lastEditedDate;

  console.log(actualDate);
  console.log(lastEditedDate);


  const days = Math.floor(diff / (60 * 60 * 24 * 1000));

  console.log(days);

  if (days > 60) {
    return 'Immediately change the password!';
  }

  if (days > 30) {
    return 'You should change your password.';
  }

  return 'Password is actual.';
}
isPasswordActual(year, month - 1, date);
module.exports = isPasswordActual;
