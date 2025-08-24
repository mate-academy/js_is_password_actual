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

  it(`should ask to change the password if was changed 61 days ago or more`, () => {
    const date = isPasswordActual(today.year, today.month, today.date - 61);

    expect(date)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 60 days ago`, () => {
    const date = isPasswordActual(today.year, today.month, today.date - 60);

    expect(date)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    const date = isPasswordActual(today.year, today.month, today.date - 31);

    expect(date)
      .toBe('You should change your password.');
  });

  it(`should say everything is ok if was changed 30 days ago`, () => {
    const date = isPasswordActual(today.year, today.month, today.date - 30);

    expect(date)
      .toBe('Password is actual.');
  });

  it(`should say everything is ok if was changed yesterday`, () => {
    const date = isPasswordActual(today.year, today.month, today.date - 1);

    expect(date)
      .toBe('Password is actual.');
  });
});
