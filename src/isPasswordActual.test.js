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
    expect(isPasswordActual(2020, 10, 25))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 
    was changed more a month ago`, () => {
    expect(isPasswordActual(2021, 9, 20))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if 
    was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 26))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 
    was changed 61 day ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 
    was changed 90 days ago`, () => {
    expect(isPasswordActual(2021, 7, 25))
      .toBe('Immediately change the password!');
  });

  it(`should shows a message that password is actual
     if was changed 0 days ago`, () => {
    expect(isPasswordActual(2021, 10, 26))
      .toBe('Password is actual.');
  });

  it(`should shows a message that password is actual
     if was changed a less than month ago`, () => {
    expect(isPasswordActual(2021, 9, 28))
      .toBe('Password is actual.');
  });
});
