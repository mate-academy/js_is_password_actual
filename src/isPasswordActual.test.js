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
    const typeOfRes
      = typeof isPasswordActual(today.year - 1, today.month, today.date);

    expect(typeOfRes).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return the message "Password is actual"
    if less than or 30 days have passed since the last password change`, () => {
    const presentYear = isPasswordActual(today.year, today.month, today.date);

    expect(presentYear).toBe('Password is actual.');
  });

  it(`should return "You should change your password"
    if more than 30 days have passed since the password change`, () => {
    const moreThan60Days
      = isPasswordActual(today.year, today.month - 1, today.date - 4);

    expect(moreThan60Days).toBe('You should change your password.');
  });
});
