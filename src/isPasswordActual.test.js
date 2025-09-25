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
    const result = isPasswordActual(today.year - 1, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if 'days' === 365`, () => {
    const lastYear
     = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 'days' >= 60`, () => {
    const date65DaysAgo = new Date();

    date65DaysAgo.setDate(date65DaysAgo.getDate() - 65);

    const result = isPasswordActual(
      date65DaysAgo.getFullYear(),
      date65DaysAgo.getMonth() + 1,
      date65DaysAgo.getDate()
    );

    expect(result).toBe('Immediately change the password!');
  });

  it(`should ask to change the password
     if 'days' > 30 and 'days' <= 60`, () => {
    const date35DaysAgo = new Date();

    date35DaysAgo.setDate(date35DaysAgo.getDate() - 35);

    const result = isPasswordActual(
      date35DaysAgo.getFullYear(),
      date35DaysAgo.getMonth() + 1,
      date35DaysAgo.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it(`should return 'Password is actual' if 'days' <= 30`, () => {
    const date10DaysAgo = new Date();

    date10DaysAgo.setDate(date10DaysAgo.getDate() - 10);

    const result = isPasswordActual(
      date10DaysAgo.getFullYear(),
      date10DaysAgo.getMonth() + 1,
      date10DaysAgo.getDate()
    );

    expect(result).toBe('Password is actual.');
  });
});
