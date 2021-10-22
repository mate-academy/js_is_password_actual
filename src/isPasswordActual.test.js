'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 10, 22))
      .toBe('Immediately change the password!');
  });

  it(`should return message that the password is actual if 
  it changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 22))
      .toBe('Password is actual.');
  });

  it(`should return message that the password is actual if 
  it changed 29 days ago`, () => {
    expect(isPasswordActual(2021, 9, 23))
      .toBe('Password is actual.');
  });

  it(`should return message that the password is actual if 
  it changed 0 days ago`, () => {
    expect(isPasswordActual(2021, 10, 22))
      .toBe('Password is actual.');
  });

  it(`should return message that you need to change password if 
  it changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 21))
      .toBe('You should change your password.');
  });

  it(`should return message that you need to change password if 
  it changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 23))
      .toBe('You should change your password.');
  });

  it(`should return message that you need to change password if 
  it changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 8, 22))
      .toBe('Immediately change the password!');
  });

  it(`should return message that you need to change password if 
  it changed 92 days ago`, () => {
    expect(isPasswordActual(2021, 7, 22))
      .toBe('Immediately change the password!');
  });
});
