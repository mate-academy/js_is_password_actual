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
    const result = isPasswordActual(2021, 6, 1);
    const returnResult = typeof result;

    expect(returnResult).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a 61 days ago`, () => {
    const twoManthAgo = isPasswordActual(today.year,
      today.month - 2, today.date);

    expect(twoManthAgo)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a 60 days ago`, () => {
    const sixtyDaysAgo = isPasswordActual(today.year,
      today.month - 2, today.date + 1);

    expect(sixtyDaysAgo)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 31 days ago`, () => {
    const thirtyOneDaysAgo = isPasswordActual(today.year,
      today.month - 1, today.date - 1);

    expect(thirtyOneDaysAgo)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 30 days ago`, () => {
    const thirtyDaysAgo = isPasswordActual(today.year,
      today.month - 1, today.date + 1);

    expect(thirtyDaysAgo)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 29 days ago`, () => {
    const twentyNineDaysAgo = isPasswordActual(today.year,
      today.month - 1, today.date + 2);

    expect(twentyNineDaysAgo)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 0 days ago`, () => {
    const zeroDaysAgo = isPasswordActual(today.year,
      today.month, today.date);

    expect(zeroDaysAgo)
      .toBe('Password is actual.');
  });
});
