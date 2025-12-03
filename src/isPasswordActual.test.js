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

  it(`should return a string - all is well`, () => {
    const actualDate = isPasswordActual(
      today.year,
      today.month,
      today.date - 30
    );

    expect(actualDate)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed 
    more then 30 day ago`, () => {
    const actualDate = isPasswordActual(
      today.year,
      today.month,
      today.date - 60
    );

    expect(actualDate)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed
    more then 60 day ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
