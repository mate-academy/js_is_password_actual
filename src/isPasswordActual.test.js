'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(isPasswordActual()).toEqual('Password is actual.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  // write more tests here

  it(`should not ask to change the password if was changed 1 day ago`, () => {
    expect(isPasswordActual(2021, 7, 19))
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password if was changed 29 days ago`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password if was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe(`You should change your password.`);
  });

  it(`should ask to change the password if was changed 59 days ago`, () => {
    expect(isPasswordActual(2021, 5, 22))
      .toBe(`You should change your password.`);
  });

  it(`should ask to change the password if was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe(`You should change your password.`);
  });

  it(`should ask to change the password immediately 
    if was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe(`Immediately change the password!`);
  });
});
