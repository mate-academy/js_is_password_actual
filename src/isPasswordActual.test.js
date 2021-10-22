'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should return "Immediately change the password!"
  if password was changed more than 60 days`, () => {
    expect(isPasswordActual(2020, 10, 22))
      .toBe('Immediately change the password!');
  });

  it(`should return "You should change your password."
     if password was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 23))
      .toBe('You should change your password.');
  });

  it(`should return "You should change your password."
   if password was changed less than 60 more than 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 9))
      .toBe('You should change your password.');
  });

  it(`should return "Password is actual."
   if password was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 22))
      .toBe('Password is actual.');
  });

  it(`should return "Password is actual."
   if password was changed less than 30`, () => {
    expect(isPasswordActual(2021, 10, 19))
      .toBe('Password is actual.');
  });
});
