/* eslint-disable max-len */
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

  it(`should ask to immediately change the password if it was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed 45 days ago`, () => {
    const fortyFiveDaysAgo = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      fortyFiveDaysAgo.getUTCFullYear(),
      fortyFiveDaysAgo.getMonth() + 1,
      fortyFiveDaysAgo.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it(`should confirm the password is actual if it was changed today`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it(`should confirm the password is actual if it was changed 15 days ago`, () => {
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      fifteenDaysAgo.getUTCFullYear(),
      fifteenDaysAgo.getMonth() + 1,
      fifteenDaysAgo.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it(`should handle edge case of 30 days ago`, () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      thirtyDaysAgo.getUTCFullYear(),
      thirtyDaysAgo.getMonth() + 1,
      thirtyDaysAgo.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it(`should handle edge case of 60 days ago`, () => {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      sixtyDaysAgo.getUTCFullYear(),
      sixtyDaysAgo.getMonth() + 1,
      sixtyDaysAgo.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it(`should handle future dates gracefully`, () => {
    const futureDate = isPasswordActual(today.year + 1, today.month, today.date);

    expect(futureDate).toBe('Password is actual.');
  });

  it(`should handle invalid dates gracefully`, () => {
    const invalidDate = isPasswordActual(2023, 2, 30); // Invalid date

    expect(invalidDate).toBe('Password is actual.');
  });
});
