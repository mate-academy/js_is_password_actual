'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 6, 9))
      .toBe('string');
  });

  it(`should ask to change the password in the imperative form
    if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`should return "Password is actual" if the password 
    was changed 30`, () => {
    expect(isPasswordActual(2021, 7, 20))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password in the imperative form
  if was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe('Immediately change the password!');
  });

  it(`should return "Password is actual" if the password 
    was changed today`, () => {
    const result = new Date(Date.now());

    expect(isPasswordActual(result.getFullYear(),
      result.getMonth(), result.getDate()))
      .toBe('Password is actual.');
  });

  it(`should return "Password is actual" if the password 
    was changed 60 day ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('You should change your password.');
  });
});
