'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 10, 24)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 10, 24))
      .toBe('Immediately change the password!');
  });

  // write more tests here

  it(`should return 'Password is actual' if the password 
  was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 24))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if
  was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 23))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if
  was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if
  was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 8, 24))
      .toBe('Immediately change the password!');
  });
});
