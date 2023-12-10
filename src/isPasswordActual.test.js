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

  it(
    'should return the message "Immediately change the password!."'
    + ' if more than 60 days have passed since the last password change',
    () => {
      const lastYear = isPasswordActual(
        today.year - 1,
        today.month,
        today.date,
      );

      expect(lastYear).toBe('Immediately change the password!');
    },
  );

  it(
    'should return the message "Password is actual."'
    + ' if 30 days or less have passed since the last password change',
    () => {
      const todayResult = isPasswordActual(
        today.year,
        today.month,
        today.date - 10,
      );

      expect(todayResult).toBe('Password is actual.');
    },
  );

  it(
    'should return the message "You should change your password."'
    + ' if more than 30 days have passed since the last password change',
    () => {
      const fortyDaysAgo = isPasswordActual(
        today.year,
        today.month,
        today.date - 33,
      );

      expect(fortyDaysAgo).toBe('You should change your password.');
    },
  );
});
