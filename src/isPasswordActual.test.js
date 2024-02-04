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
    const lastYear
      = isPasswordActual(today.year - 1, today.month - 1, today.date - 1);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return actual if was changed 30 days or less`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 20);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return  change if was changed more than 30 days`, () => {
    const lastYear
      = isPasswordActual(today.year, today.month - 1, today.date - 1);

    expect(lastYear)
      .toBe('You should change your password.');
  });
});
