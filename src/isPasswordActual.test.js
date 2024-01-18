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

  it(`should ask to change the password if was changed a 60 days ago`, () => {
    const twoMonthAgo = isPasswordActual(today.year, today.month, today.date - 60);

    expect(twoMonthAgo)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed more than 31 days ago`, () => {
    const thirtyOneDayAgo = isPasswordActual(today.year, today.month - 1, today.date - 3);

    expect(thirtyOneDayAgo)
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual.' if the password was changed a 30 days ago`, () => {
    const oneMonthAgo = isPasswordActual(today.year, today.month, today.date - 30);

    expect(oneMonthAgo)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if the password was changed in the current day`, () => {
    const currentDay = isPasswordActual(today.year, today.month, today.date);

    expect(currentDay)
      .toBe('Password is actual.');
  });
});
