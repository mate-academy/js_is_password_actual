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
    const result = isPasswordActual(2020, 6, 9);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed more than a month ago`, () => {
    const lastMonth = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 1,
    );

    expect(lastMonth).toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed less than a month ago`, () => {
    const lastWeek = isPasswordActual(today.year, today.month, today.date);

    expect(lastWeek).toBe('Password is actual.');
  });
});
