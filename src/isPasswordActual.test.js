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

  it(`should ask to change the password if it was changed more than
  60 days ago`, () => {
    const sixtyOneDaysAgo
      = isPasswordActual(today.year, today.month, today.date - 61);

    expect(sixtyOneDaysAgo).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed more than
  30 days ago`, () => {
    const thirtyOneDaysAgo
      = isPasswordActual(today.year, today.month, today.date - 31);

    expect(thirtyOneDaysAgo).toBe('You should change your password.');
  });

  it(`should consider the password as actual if it was changed
  30 days or less ago`, () => {
    const thirtyDaysAgo
    = isPasswordActual(today.year, today.month, today.date - 30);

    expect(thirtyDaysAgo).toBe('Password is actual.');
  });
});
