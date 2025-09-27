'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1, // JS months are 0-indexed
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe('string');
  });

  it(`should return "Password is actual." if password was changed recently (<=30 days)`, () => {
    const recent = isPasswordActual(today.year, today.month, today.date);
    expect(recent).toBe('Password is actual.');

    // 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    expect(
      isPasswordActual(
        thirtyDaysAgo.getFullYear(),
        thirtyDaysAgo.getMonth() + 1,
        thirtyDaysAgo.getDate()
      )
    ).toBe('Password is actual.');
  });

  it(`should return "You should change your password." if 31–60 days have passed`, () => {
    const thirtyOneDaysAgo = new Date();
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);
    expect(
      isPasswordActual(
        thirtyOneDaysAgo.getFullYear(),
        thirtyOneDaysAgo.getMonth() + 1,
        thirtyOneDaysAgo.getDate()
      )
    ).toBe('You should change your password.');

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    expect(
      isPasswordActual(
        sixtyDaysAgo.getFullYear(),
        sixtyDaysAgo.getMonth() + 1,
        sixtyDaysAgo.getDate()
      )
    ).toBe('You should change your password.');
  });

  it(`should return "Immediately change the password!" if more than 60 days have passed`, () => {
    const sixtyOneDaysAgo = new Date();
    sixtyOneDaysAgo.setDate(sixtyOneDaysAgo.getDate() - 61);
    expect(
      isPasswordActual(
        sixtyOneDaysAgo.getFullYear(),
        sixtyOneDaysAgo.getMonth() + 1,
        sixtyOneDaysAgo.getDate()
      )
    ).toBe('Immediately change the password!');

    // One year ago
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    expect(
      isPasswordActual(
        lastYear.getFullYear(),
        lastYear.getMonth() + 1,
        lastYear.getDate()
      )
    ).toBe('Immediately change the password!');
  });
});
