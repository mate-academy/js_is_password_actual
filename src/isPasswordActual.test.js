'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(`ask to change the password if it changed more than two month ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`ask to change the password if it changed more than a month ago`, () => {
    expect(isPasswordActual(2021, 9, 9))
      .toBe('You should change your password.');
  });

  it(`say that Password is actual if it changed less then month ago`, () => {
    expect(isPasswordActual(2021, 10, 20))
      .toBe('Password is actual.');
  });

  it(`ask to change the password if it changed more than a year ago`, () => {
    expect(isPasswordActual(0, 0, 0))
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
