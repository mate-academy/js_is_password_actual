'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  // tests actual for 03/11/2022
  // THEY WON'T WORK ON DIFFIRENT DATE

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect.stringContaining(isPasswordActual(2022, 10, 9));
  });

  it(`should verify actual password if it`
  + ` was changed less than 30 days ago`, () => {
    expect(isPasswordActual(2022, 10, 9))
      .toBe('Password is actual.');
  });

  it(`should verify actual password if it`
  + ` was changed exactly 30 days `, () => {
    expect(isPasswordActual(2022, 10, 4))
      .toBe('Password is actual.');
  });

  it(`should give advice to change the password `
  + `if it wasn't updated more than 30 days ago`, () => {
    expect(isPasswordActual(2022, 9, 9))
      .toBe('You should change your password.');
  });

  it(`should give advice to change the password `
  + `if it wasn't updated for exactly 60 days`, () => {
    expect(isPasswordActual(2022, 9, 4))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password as soon`
  + ` as possible if it was more than 60 days`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
