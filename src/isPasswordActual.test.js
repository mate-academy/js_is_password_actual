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

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // write more tests here
  it(`should return
  "Immediately change the password!" if it was changed 60 days ago`, () => {
    const month60 = isPasswordActual(today.year, today.month - 2, today.date);

    expect(month60)
      .toBe('Immediately change the password!');
  });

  it(`should return
  "You should change your password." if it was changed 60 days ago`, () => {
    const month59 = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 29);

    expect(month59)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 31 day ago`, () => {
    const month31 = isPasswordActual(today.year, today.month, today.date - 31);

    expect(month31)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 30 day ago`, () => {
    const month30 = isPasswordActual(today.year, today.month, today.date - 30);

    expect(month30)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 29 day ago`, () => {
    const month29 = isPasswordActual(today.year, today.month, today.date - 29);

    expect(month29)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 1 day ago`, () => {
    const day1 = isPasswordActual(today.year, today.month, today.date - 1);

    expect(day1)
      .toBe('Password is actual.');
  });
});
