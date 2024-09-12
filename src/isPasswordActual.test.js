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

  it(`should insist on a password change if it has been`
    + ` changed more than 60 days ago`, () => {
    const lastTime = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastTime)
      .toBe('Immediately change the password!');
  });

  it(`should offer to change the password if it has been changed`
    + `more than 30 days but less than 60 days ago`, () => {
    const lastTime = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 15
    );

    expect(lastTime)
      .toBe('You should change your password.');
  });

  it(`must confirm that the password is current if it was`
    + `changed less than 30 days ago`, () => {
    const lastTime = isPasswordActual(
      today.year,
      today.month,
      today.date - 30
    );

    expect(lastTime)
      .toBe('Password is actual.');
  });
});
