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

  it(`should return 'Password is actual' if changed today`, () => {
    const result = isPasswordActual(today.year, today.month, today.data);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'Password is actual' if chenged 10 days ago`, () => {
    const tenDaysAgo = new Date();

    tenDaysAgo.setDate(date.getDate() - 10);

    const result = isPasswordActual(tenDaysAgo.getFullYear(),
      tenDaysAgo.getMonth() + 1, tenDaysAgo.getDate());

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' if changed 31 days ago`,
    () => {
      const dateAgo = new Date();

      dateAgo.setDate(dateAgo.getDate() - 31);

      const result = isPasswordActual(
        dateAgo.getFullYear(),
        dateAgo.getMonth() + 1,
        dateAgo.getDate());

      expect(result).toBe('You should change your password.');
    });

  it(`should return 'Immediately change the password!' if changed 61 days ago`,
    () => {
      const date61Ago = new Date();

      date61Ago.setDate(date61Ago.getDate() - 61);

      const result = isPasswordActual(
        date61Ago.getFullYear(),
        date61Ago.getMonth() + 1,
        date61Ago.getDate());

      expect(result).toBe('Immediately change the password!');
    });
});
