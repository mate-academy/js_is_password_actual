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
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return "Immediately change the password!"
  if password was changed more than 60 days`, () => {
    expect(isPasswordActual(2020, 10, 24))
      .toBe('Immediately change the password!');
  });

  it(`should return "Password is actual."
  if password was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 26))
      .toBe('Password is actual.');
  });

  it(`should return "Password is actual."
  if password was changed less than 30`, () => {
    expect(isPasswordActual(2021, 10, 15))
      .toBe('Password is actual.');
  });

  it(`should return "You should change your password."
  if password was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 27))
      .toBe('You should change your password.');
  });
});
