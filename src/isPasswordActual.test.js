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
    const result = isPasswordActual();

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a month ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should return 'actual' if password was changed a month ago or less`,
    () => {
      const lastYear
        = isPasswordActual(today.year, today.month, today.date - 30);

      expect(lastYear)
        .toBe('Password is actual.');
    });
});
