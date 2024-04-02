/* eslint-disable max-len */
'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(1990, 5, 21)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was for more than 60 days`, () => {
    let sixtyDayAgo;

    if (today.month > 1) {
      sixtyDayAgo = isPasswordActual(today.year, today.month - 2, today.date);
    } else {
      sixtyDayAgo = isPasswordActual(today.year, 11 - today.month - 2, today.date);
    }

    expect(sixtyDayAgo)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was for more than 30 days`, () => {
    let thirtyDayAgo;

    if (today.month > 0) {
      thirtyDayAgo = isPasswordActual(today.year, today.month - 1, today.date);
    } else {
      thirtyDayAgo = isPasswordActual(today.year, 11 - today.month - 1, today.date);
    }

    expect(thirtyDayAgo)
      .toBe('You should change your password.');
  });

  it(`must report that the password is valid if 29 days have passed`, () => {
    let twentyNineDayAgo;

    if (today.date - 29 > 0) {
      twentyNineDayAgo = isPasswordActual(today.year, today.month, today.date - 29);
    } else {
      if (today.month - 1 >= 0) {
        twentyNineDayAgo = isPasswordActual(today.year, today.month - 1, today.date + 1);
      } else {
        twentyNineDayAgo = isPasswordActual(today.year - 1, today.month + 10, today.date + 1);
      }
    }

    expect(twentyNineDayAgo)
      .toBe('Password is actual.');
  });
});
