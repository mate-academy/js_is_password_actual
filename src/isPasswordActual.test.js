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

  it(`should return 'Password is actual' 
  message if func has no argument`, () => {
    const lastYear = isPasswordActual();

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' 
  if last password update < 60 days ago`, () => {
    const lastYear = isPasswordActual(2024, 8, 25);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual' 
  if one of arguments is missing`, () => {
    const lastYear = isPasswordActual(2024, 8);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual' 
  if string used as argument`, () => {
    const lastYear = isPasswordActual('20g4', '8', '6');

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
