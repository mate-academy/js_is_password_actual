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

  });

  it(`should ask to change the password if last chamge was 30+ day ago`, () => {
    const changePass
     = isPasswordActual(today.year, today.month - 1, today.month - 4);

    expect(changePass)
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual' if change was < 30 days ago`, () => {
    const actualPass
     = isPasswordActual(today.year, today.month, today.month - 4);

    expect(actualPass)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
