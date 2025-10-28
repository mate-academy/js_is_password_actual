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
    const actual = isPasswordActual(today.year, today.month, today.date);

    expect(typeof actual).toBe('string');
  });

  it(`should іmmediately to change the password
    if was changed a year ago`, () => {
    const actual = isPasswordActual(today.year - 1, today.month, today.date);

    expect(actual)
      .toBe('Immediately change the password!');
  });

  it(`should іmmediately to change the password
    if was changed more than 60 days ago`, () => {
    const actual = isPasswordActual(2025, 8, 28);

    expect(actual)
      .toBe('Immediately change the password!');
  });

  it(`should to change the password
    if was changed 60 days ago`, () => {
    const actual = isPasswordActual(2025, 8, 29);

    expect(actual)
      .toBe('You should change your password.');
  });

  it(`should to change the password
    if was changed 53 days ago`, () => {
    const actual = isPasswordActual(2025, 9, 5);

    expect(actual)
      .toBe('You should change your password.');
  });

  it(`password is actual
    if was changed 30 days ago`, () => {
    const actual = isPasswordActual(today.year, today.month - 1, today.date);

    expect(actual)
      .toBe('Password is actual.');
  });

  it(`password is actual
    if was changed 26 days ago`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date - 26);

    expect(actual)
      .toBe('Password is actual.');
  });

  it(`password is actual
    if was changed 1 day ago`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date - 1);

    expect(actual)
      .toBe('Password is actual.');
  });

  it(`password is actual
    if was changed today`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date);

    expect(actual)
      .toBe('Password is actual.');
  });
});
