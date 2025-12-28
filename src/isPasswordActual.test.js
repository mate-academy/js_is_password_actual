'use strict';
/* eslint-disable max-len */

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  const PASSWORD_EXPIRED_MESSAGE = 'Immediately change the password!';
  const PASSWORD_ACTUAL_MESSAGE = 'Password is actual.';
  const PASSWORD_SOON_EXPIRES_MESSAGE = 'You should change your password.';

  const today = new Date();

  function getDateDaysAgo(days) {
    const date = new Date(today);

    date.setDate(date.getDate() - days);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    };
  }

  it('should be declared', () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it('should return a string', () => {
    const { year, month, date } = getDateDaysAgo(0);

    expect(typeof isPasswordActual(year, month, date)).toBe('string');
  });

  it('should return "Password is actual." if 30 days or less passed', () => {
    const { year, month, date } = getDateDaysAgo(30);

    expect(isPasswordActual(year, month, date))
      .toBe(PASSWORD_ACTUAL_MESSAGE);
  });

  it('should return "You should change your password." if more than 30 but not more than 60 days passed', () => {
    const { year, month, date } = getDateDaysAgo(31);

    expect(isPasswordActual(year, month, date))
      .toBe(PASSWORD_SOON_EXPIRES_MESSAGE);
  });

  it('should return "You should change your password." if exactly 60 days passed', () => {
    const { year, month, date } = getDateDaysAgo(60);

    expect(isPasswordActual(year, month, date))
      .toBe(PASSWORD_SOON_EXPIRES_MESSAGE);
  });

  it('should return "Immediately change the password!" if more than 60 days passed', () => {
    const { year, month, date } = getDateDaysAgo(61);

    expect(isPasswordActual(year, month, date))
      .toBe(PASSWORD_EXPIRED_MESSAGE);
  });
});
