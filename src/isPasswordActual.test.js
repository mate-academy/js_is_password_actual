'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`shouldn't ask to change the password if password was changed today`, () => {
    expect(isPasswordActual(2022, 1, 6)) 
      .toBe('Password is actual.')
  });

  it(`shouldn't ask to change the password if password was changed two weeks ago`, () => {
    expect(isPasswordActual(2021,12,22)) .toBe('Password is actual.');
  });

  it(`shouldn't ask to change the password if password was changed 30 days ago`, () => {
    expect(isPasswordActual(2021,12, 7)) .toBe('Password is actual.');
  });

  it(`should recommend to change the password if password was changed 31 days ago`, () => {
    expect(isPasswordActual(2021,12, 6)) .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password if password was changed 45 days ago`, () => {
    expect(isPasswordActual(2021,11, 21)) .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password if password was changed 60 days ago`, () => {
    expect(isPasswordActual(2021,11, 7)) .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 61 days ago`, () => {
    expect(isPasswordActual(2021,11, 6))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2021, 1, 6))
      .toBe('Immediately change the password!');
  });
});
