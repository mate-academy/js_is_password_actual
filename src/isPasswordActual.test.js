'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual())
      .toBe('string');
  });

  it(`should ask to change the password immediatly
    if it was changed a year ago`, () => {
    expect(isPasswordActual(2020, 10, 24))
      .toBe('Immediately change the password!');
  });

  // write more tests here
  it(`should report that password is actual
    if it was changed today`, () => {
    expect(isPasswordActual(2021, 10, 24))
      .toBe('Password is actual.');
  });

  it(`should report that password is actual
    if it was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 24))
      .toBe('Password is actual.');
  });

  it(`should ask to change your password
    if it was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 23))
      .toBe('You should change your password.');
  });

  it(`should ask to change your password
    if it was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('You should change your password.');
  });

  it(`should ask to change your password immediatly
    if it was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 8, 24))
      .toBe('Immediately change the password!');
  });
});
