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

  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);
    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return error
  message if func has no argument`, () => {
    expect(() => isPasswordActual())
      .toThrow();
  });

  it(`should return 'You should change your password.' 
  if last password update < 60 days ago`, () => {
    const lastYear = isPasswordActual(2024, 8, 24);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should return error message
  if one of arguments is missing`, () => {
    expect(() => isPasswordActual(2024, 8))
      .toThrow();
  });

  it(`should return error message
  if string used as argument`, () => {
    expect(() => isPasswordActual('20g4', '8', '6'))
      .toThrow();
  });

  it(`should return 'Password is actual' message
  if last password update < 30 days ago `, () => {
    expect(isPasswordActual(2024, 10, 22))
      .toBe('Password is actual.');
  });
});
