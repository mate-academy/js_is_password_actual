'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('qwer')).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if was changed 60 and more days ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('Immediately change the password!');
  });

  it(`shouldn't ask to change the password 
  if was changed 30 days or less`, () => {
    expect(isPasswordActual(2021, 9, 27))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password 
  if was changed more than 30 days`, () => {
    expect(isPasswordActual(2021, 9, 25))
      .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password 
  if was changed today`, () => {
    expect(isPasswordActual(2021, 10, 26))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password 
  if was changed 59 days ago`, () => {
    expect(isPasswordActual(2021, 8, 27))
      .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password 
  if was changed yesterday`, () => {
    expect(isPasswordActual(2021, 10, 26))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a 11 month ago`, () => {
    expect(isPasswordActual(2020, 12, 9))
      .toBe('Immediately change the password!');
  });
});
