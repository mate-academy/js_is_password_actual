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

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 61 days ago`, () => {
    const lastMonth
    = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastMonth).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    const lastMonth
    = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lastMonth).toBe('You should change your password.');
  });

  it(`should say the password is actual if
  it was changed less than 30 days ago`, () => {
    const lastMonth
    = isPasswordActual(today.year, today.month, today.date - 29);

    expect(lastMonth).toBe('Password is actual.');
  });

  it(`should say the password is actual if it was changed today`, () => {
    const todayChanged = isPasswordActual(today.year, today.month, today.date);

    expect(todayChanged).toBe('Password is actual.');
  });

  it(`should say the password is actual if
  it was changed less than 24 hours ago`, () => {
    const yesterday = new Date(date.setDate(date.getDate() - 1));
    const yesterdayChanged
    = isPasswordActual(yesterday.getUTCFullYear(), yesterday.getMonth()
    + 1, yesterday.getDate());

    expect(yesterdayChanged).toBe('Password is actual.');
  });
});
