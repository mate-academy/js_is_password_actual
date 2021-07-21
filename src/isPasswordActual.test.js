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
    expect(isPasswordActual(2020, 7, 21))
      .toBe('Immediately change the password!');
  });

  it(`should not ask to change the password
  if was changed a 29 days ago`, () => {
    expect(isPasswordActual(2021, 6, 22))
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password
  if was changed a 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 59 days ago`, () => {
    expect(isPasswordActual(2021, 5, 23))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 60 days ago`, () => {
    expect(isPasswordActual(2021, 5, 22))
      .toBe('You should change your password.');
  });

  it(`should ask imidiatly change the password
  if was changed a 61 days ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('Immediately change the password!');
  });

  it(`should ask imidiatly change the password
  if was changed a 91 days ago`, () => {
    expect(isPasswordActual(2021, 4, 21))
      .toBe('Immediately change the password!');
  });

  it(`should not ask to change the password
  if was changed a 0 days ago`, () => {
    expect(isPasswordActual(2021, 7, 21))
      .toBe('Password is actual.');
  });
});
