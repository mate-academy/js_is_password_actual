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
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`should ask immediately change the password `
   + `if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask immediately change the password `
   + `if was changed more than 60 days ago`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastEditedDate)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password `
   + `if was changed 60 days ago`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date - 60);

    expect(lastEditedDate)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password `
   + `if was changed between 31 days and 60 days ago`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lastEditedDate)
      .toBe('You should change your password.');
  });

  it(`should not ask to change the password `
   + `if was changed 30 days ago`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastEditedDate)
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password `
   + `if was changed less than 30 days ago`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date - 10);

    expect(lastEditedDate)
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password `
   + `if was changed today`, () => {
    const lastEditedDate
      = isPasswordActual(today.year, today.month, today.date);

    expect(lastEditedDate)
      .toBe('Password is actual.');
  });
});
