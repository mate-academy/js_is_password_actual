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
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return 'Password is actual.''
    + 'when password was changed today`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.''
    + 'if password was changed more than 30 days ago`, () => {
    const thirtyOneDaysAgo = new Date(today.year,
      today.month - 1, today.date - 31);

    const result = isPasswordActual(thirtyOneDaysAgo.getFullYear(),
      thirtyOneDaysAgo.getMonth() + 1, thirtyOneDaysAgo.getDate());

    expect(result).toBe('You should change your password.');
  });
});
