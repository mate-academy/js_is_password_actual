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

    expect(result).toEqual(expect.any(String));
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(2024, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should approve if password is actual`, () => {
    const currentYear = isPasswordActual(today.year, today.month, today.date);

    expect(currentYear)
      .toBe('Password is actual.');
  });

  it(`should remind if more than 30 days have passed`, () => {
    const lastMonth = isPasswordActual(
      today.year,
      6,
      5
    );

    expect(lastMonth)
      .toBe('You should change your password.');
  });
});
