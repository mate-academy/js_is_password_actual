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
    const result = isPasswordActual(
      today.year,
      today.month,
      today.date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const lastYear = isPasswordActual(
      today.year - 1,
      today.month,
      today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed`
    + ` more than 30 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 10);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should say that the password is actual if`
    + ` it was changed less than 30 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month,
      today.date - 10);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
