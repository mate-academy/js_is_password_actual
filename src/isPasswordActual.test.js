'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`be declared`, () => {
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  it(`return a string`, () => {
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`ask to change the password if was changed more than 60 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month - 2, today.date - 1
    );

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`remind to change the password
    if was changed more than 30 and less then 60 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month - 1, today.date - 7
    );

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`message if the password is up to date`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month, today.date - 7
    );

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
