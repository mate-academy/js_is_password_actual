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
    const result = isPasswordActual(2024, 5, 4);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed
      more than 60 days ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should recommend to change the password if was changed
      more than 30 days and less than 60 days ago`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 35);

    expect(result).toBe('You should change your password.');
  });

  it(`should returns the messag if password was changed
      30 days ago or less`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 29);

    expect(result).toBe('Password is actual.');
  });
});
