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

  it(`should ask to change the password if it was changed 61 days ago`, () => {
    const daysAgo = isPasswordActual(today.year, today.month, today.date - 61);

    expect(daysAgo).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed 31 days ago`, () => {
    const daysAgo = isPasswordActual(today.year, today.month, today.date - 31);

    expect(daysAgo).toBe('You should change your password.');
  });

  it(`should consider password as actual if it was changed 30 days ago`, () => {
    const daysAgo = isPasswordActual(today.year, today.month, today.date - 30);

    expect(daysAgo).toBe('Password is actual.');
  });

  it(`should consider password as actual if it was changed today`, () => {
    const daysAgo = isPasswordActual(today.year, today.month, today.date);

    expect(daysAgo).toBe('Password is actual.');
  });
});
