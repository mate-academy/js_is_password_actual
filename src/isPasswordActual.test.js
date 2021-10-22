'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 6, 9)).toBe('string');
  });

  it(`should return the message 'Password is actual'
  If 0 days passed since the last password change`, () => {
    expect(isPasswordActual(2021, 10, 22))
      .toBe('Password is actual.');
  });

  it(`should return the message 'Password is actual'
  If 30 days passed since the last password change`, () => {
    expect(isPasswordActual(2021, 9, 22))
      .toBe('Password is actual.');
  });

  it(`should return the message 'You should change your password.'
  If 31 days passed since the last password change`, () => {
    expect(isPasswordActual(2021, 9, 21))
      .toBe('You should change your password.');
  });

  it(`should return the message 'You should change your password.'
  If 60 days passed since the last password change`, () => {
    expect(isPasswordActual(2021, 8, 23))
      .toBe('You should change your password.');
  });

  it(`should return the message 'Immediately change the password!'
  If 61 days passed since the last password change`, () => {
    expect(isPasswordActual(2021, 8, 21))
      .toBe('Immediately change the password!');
  });

  it(`should return the message 'Immediately change the password!'
  If 365 days passed since the last password change`, () => {
    expect(isPasswordActual(2020, 9, 22))
      .toBe('Immediately change the password!');
  });
});
