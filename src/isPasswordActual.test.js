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
    const str = isPasswordActual(2020, 6, 9);

    expect(typeof str).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed > 60 days`, () => {
    const lastYear = isPasswordActual(today.year, today.month - 2, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should recommend to change the password if was changed a 30 days`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth)
      .toBe('You should change your password.');
  });

  it(`should approve if the password is actual`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date);

    expect(actual)
      .toBe('Password is actual.');
  });
});

