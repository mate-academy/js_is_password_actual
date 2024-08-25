'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date();
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be a function`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should confirm password is actual (0 days)`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it(`should confirm password is actual (30 days)`, () => {
    const daysAgo = 30;
    const pastDate = new Date(Date.now() - daysAgo * 86400000);
    const result = isPasswordActual(
      pastDate.getUTCFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it(`should suggest a change (31 days)`, () => {
    const daysAgo = 31;
    const pastDate = new Date(Date.now() - daysAgo * 86400000);
    const result = isPasswordActual(
      pastDate.getUTCFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it(`should suggest immediate change (61 days)`, () => {
    const daysAgo = 61;
    const pastDate = new Date(Date.now() - daysAgo * 86400000);
    const result = isPasswordActual(
      pastDate.getUTCFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('Immediately change the password!');
  });

  it(`should suggest immediate change if a year old`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });
});
