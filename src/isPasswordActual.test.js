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

  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

    it(`should return 'Password is actual.' if password was changed today`, () => {
    const todayChange = isPasswordActual(today.year, today.month, today.date);

    expect(todayChange)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if password was changed 30 days ago`, () => {
    const thirtyDaysAgo = isPasswordActual(today.year, today.month, today.date - 30);

    expect(thirtyDaysAgo)
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' if password was changed 31 days ago`, () => {
    const thirtyOneDaysAgo = isPasswordActual(today.year, today.month, today.date - 31);

    expect(thirtyOneDaysAgo)
      .toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!' if password was changed 61 days ago`, () => {
    const sixtyOneDaysAgo = isPasswordActual(today.year, today.month, today.date - 61);

    expect(sixtyOneDaysAgo)
      .toBe('Immediately change the password!');
  });
});
