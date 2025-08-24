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
    const r = isPasswordActual(1, 1, 1);

    expect(typeof r).toBe('string');
  });

  it(`should ask to change the password if was changed 61 days ago`, () => {
    const d = isPasswordActual(today.year, today.month, today.date - 61);

    expect(d)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 60 days ago`, () => {
    const d = isPasswordActual(today.year, today.month, today.date - 60);

    expect(d)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    const d = isPasswordActual(today.year, today.month, today.date - 31);

    expect(d)
      .toBe('You should change your password.');
  });

  it(`should say everything is ok if was changed 30 days ago`, () => {
    const d = isPasswordActual(today.year, today.month, today.date - 30);

    expect(d)
      .toBe('Password is actual.');
  });

  it(`should say everything is ok if was changed yesterday`, () => {
    const d = isPasswordActual(today.year, today.month, today.date - 1);

    expect(d)
      .toBe('Password is actual.');
  });
});
