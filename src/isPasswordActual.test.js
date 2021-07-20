'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('')).toBe('string');
  });

  it(`should ask to change the password if more than 30 days have passed since
   the last password change`, () => {
    expect(isPasswordActual(2021, 6, 2))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed less
   than 30 days ago`, () => {
    expect(isPasswordActual(2021, 7, 2))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed two month ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 59 days ago`, () => {
    expect(isPasswordActual(2021, 5, 22))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe('You should change your password.');
  });

  it(`should return the message if password was changed today`, () => {
    expect(isPasswordActual(2021, 7, 20))
      .toBe('Password is actual.');
  });

  // write more tests here
});
