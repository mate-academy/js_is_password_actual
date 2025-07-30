'use strict';

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 *
 * @returns {string}
 */
// debugger;

function isPasswordActual(year, month, date) {
  const doHaveLackOfArguments
    = year === undefined
    || month === undefined
    || date === undefined;

  if (doHaveLackOfArguments) {
    return 'The data of last password change is incorrect!';
  }

  const oneDayInMilisecond = 86400000;
  const actual = new Date();
  const actualYear = actual.getFullYear();
  const actualMonth = actual.getMonth() + 1;
  const actualDay = actual.getDate();

  switch (true) {
    case month > 12:
    case date > 31:
    case actualYear < year:
    case (actualYear === year) && (actualMonth < month):
    case (actualYear === year) && (actualMonth === month) && (actualDay < date):
      return 'The data of last password change is incorrect!';

    default:
      const dateInMilisecond = new Date(`${year}-02-28`).getTime();
      const nextDay = new Date(dateInMilisecond + oneDayInMilisecond).getDate();
      const isLeapYear = nextDay === 29;
      const monthLength = isLeapYear
        ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const chosenMonthLastDay = monthLength[month - 1];

      if (chosenMonthLastDay < date) {
        return 'The data of last password change is incorrect!';
      }

      if (!isLeapYear && month === 2 && date >= 29) {
        return 'The data of last password change is incorrect!';
      }
  }

  const actualDate = new Date(Date.now()).getTime();
  const lastEditedDate = new Date(year, month - 1, date).getTime();
  const diff = actualDate - lastEditedDate;

  const days = Math.floor(diff / oneDayInMilisecond);

  if (days > 60) {
    return 'Immediately change the password!';
  }

  if (days > 30) {
    return 'You should change your password.';
  }

  return 'Password is actual.';
}

module.exports = isPasswordActual;
