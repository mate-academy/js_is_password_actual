'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 
    was changed more a month ago`, () => {
    expect(isPasswordActual(2021, 9, 20))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if 
    was changed more than 2 months ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('Immediately change the password!');
  });

  it(`should shows a message that password is actual
     if was changed a less than month ago`, () => {
    expect(isPasswordActual(2021, 9, 28))
      .toBe('Password is actual.');
  });
});
