'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {

  });

  it(`User create password 30 days ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe('Password is actual.');
  });

  it(`User create password 31 days ago`, () => {
    expect(isPasswordActual(2021, 5, 19))
      .toBe('You should change your password.');
  });

  it(`User create password 59 days ago`, () => {
    expect(isPasswordActual(2021, 4, 21))
      .toBe('You should change your password.');
  });

  it(`User create password 60 days ago`, () => {
    expect(isPasswordActual(2021, 4, 20))
      .toBe('Immediately change the password!');
  });

  it(`User create password more than 61 days ago`, () => {
    expect(isPasswordActual(2021, 4, 19))
      .toBe('Immediately change the password!');
  });
});

// <= 30 - повідомлення Password is actual.
// > 30 днів - повідомлення You should change your password.
// > 60 днів - повідомлення Immediately change the password!
