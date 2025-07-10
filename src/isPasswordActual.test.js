'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  function getDateNDaysAgo(n) {
    const now = new Date();

    now.setDate(now.getDate() - n);

    return {
      year: now.getUTCFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    };
  }

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should ask to change the password immediately if was
    changed 61 days ago`, () => {
    const past = getDateNDaysAgo(61);
    const actual = isPasswordActual(past.year, past.month, past.date);

    expect(actual)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was
    changed 60 days ago`, () => {
    const past = getDateNDaysAgo(60);
    const actual = isPasswordActual(past.year, past.month, past.date);

    expect(actual)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was
    changed 31 days ago`, () => {
    const past = getDateNDaysAgo(31);
    const actual = isPasswordActual(past.year, past.month, past.date);

    expect(actual)
      .toBe('You should change your password.');
  });

  it(`should return message 'Password is actual.' if was
    changed 30 days ago`, () => {
    const past = getDateNDaysAgo(30);
    const actual = isPasswordActual(past.year, past.month, past.date);

    expect(actual)
      .toBe('Password is actual.');
  });
});
