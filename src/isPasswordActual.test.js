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
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result
    = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result)
      .toBe('string');
  });

  it(`should ask to change the password
   if was changed a year ago`, () => {
    const lastYear
    = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password
   if was changed > 60 days ago`, () => {
    const moreThenTwoMonths
    = isPasswordActual(today.year, today.month - 2, today.date - 3);

    expect(moreThenTwoMonths)
      .toBe('Immediately change the password!');
  });

  it(`should recommend to change the password
   if was changed < 60 and > 30 days ago`, () => {
    const lessTwoMonths
    = isPasswordActual(today.year, today.month - 2, today.date + 3);

    expect(lessTwoMonths)
      .toBe('You should change your password.');
  });

  it(`should recommend to change the password
   if was changed < 60 and > 30 days ago`, () => {
    const lessTwoMonths
    = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lessTwoMonths)
      .toBe('You should change your password.');
  });

  it(`should reply if password was changed less than 30 days ago`, () => {
    const lessTwoMonths
    = isPasswordActual(today.year, today.month, today.date - 1);

    expect(lessTwoMonths)
      .toBe('Password is actual.');
  });

  it(`should reply if password was changed less than 30 days ago`, () => {
    const lessTwoMonths
    = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lessTwoMonths)
      .toBe('Password is actual.');
  });
});
