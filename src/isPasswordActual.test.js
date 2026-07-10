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

  it(`should return a string`, () => {});

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should say that the password is actual if it was changed <= 30 days`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 5);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed > 30 < 60 days`, () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 5,
    );

    expect(lastYear).toBe('You should change your password.');
  });
});
