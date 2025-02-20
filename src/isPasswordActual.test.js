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
    expect(typeof isPasswordActual(2024, 1, 29)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return: Immediately change the password!`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should return: Password is actual.`, () => {
    expect(isPasswordActual(2024, 1, 1))
      .toBe('Password is actual.');
  });

  it(`should return: You should change your password.`, () => {
    expect(isPasswordActual(2023, 12, 1))
      .toBe('You should change your password.');
  });

  it(`should return: Password is actual.`, () => {
    expect(isPasswordActual(2024, 1, 20))
      .toBe('Password is actual.');
  });
});
