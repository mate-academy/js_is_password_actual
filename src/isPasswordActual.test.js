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
    expect(typeof isPasswordActual(today)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return is actual if 30 days or
  less have passed since the last password change`, () => {
    const message = isPasswordActual(today.year, today.month, today.date - 30);

    expect(message).toBe('Password is actual.');
  });

  it(`should ask to change the password
  if was changed 31 days or more ago`, () => {
    const message = isPasswordActual(today.year, today.month, today.date - 31);

    expect(message).toBe('You should change your password.');
  });

  it(`should ask to immediately change the password
  if was changed 61 days or more ago".`, () => {
    const message = isPasswordActual(today.year, today.month, today.date - 61);

    expect(message).toBe('Immediately change the password!');
  });
});
