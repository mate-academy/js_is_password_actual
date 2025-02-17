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
    // eslint-disable-next-line max-len
    expect(typeof isPasswordActual(today.year, today.month, today.date)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // eslint-disable-next-line max-len
  it(`should ask to change the password if was changed three months ago`, () => {
    const lastChange = isPasswordActual(today.year, today.month - 3, today.date);

    expect(lastChange)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    const lastChange = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lastChange)
      .toBe('You should change your password.');
  });

  it(`should return that password is actual if changed within last 30 days`, () => {
    const lastChange = isPasswordActual(today.year, today.month, today.date - 10);

    expect(lastChange)
      .toBe('Password is actual.');
  });
});
