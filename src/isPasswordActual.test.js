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
    expect(typeof isPasswordActual(0, 0, 0)).toBe('string');
  });

  it(`should return 'Password is actual.'`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed`
    + `more than 30 days ago`, () => {
    const result = isPasswordActual(
      today.year, today.month - 1, today.date - 3
    );

    expect(result)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed`
    + `more than 60 days ago`, () => {
    const result = isPasswordActual(
      today.year, today.month - 2, today.date - 3
    );

    expect(result)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const result = isPasswordActual(today.year - 1, today.month, today.date);

    expect(result)
      .toBe('Immediately change the password!');
  });
});
