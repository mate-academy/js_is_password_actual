'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 7, 20))
      .toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed 60 day ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if it was changed 35 days ago`, () => {
    expect(isPasswordActual(2021, 6, 15))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if it was changed 31 day ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe('You should change your password.');
  });

  it(`should message that password is
    actual if it was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`should message that password is
    actual if it was changed 1 day ago`, () => {
    expect(isPasswordActual(2021, 7, 19))
      .toBe('Password is actual.');
  });

  it(`should message that password is
    actual if it was changed today`, () => {
    expect(isPasswordActual(2021, 7, 20))
      .toBe('Password is actual.');
  });
});
