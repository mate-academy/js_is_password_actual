'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should ask to change the password 
  if it was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if it was changed a half of year ago`, () => {
    expect(isPasswordActual(2021, 1, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if it was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 4, 19))
      .toBe('Immediately change the password!');
  });

  it(`should advice to change the password 
  if it was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('You should change your password.');
  });

  it(`should advice to change the password 
  if it was changed 37 days ago`, () => {
    expect(isPasswordActual(2021, 6, 13))
      .toBe('You should change your password.');
  });

  it(`should advice to change the password 
  if it was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe('You should change your password.');
  });

  it(`should not ask to change the password 
  if it was 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`should not ask to change the password 
  if it was changed a week ago`, () => {
    expect(isPasswordActual(2021, 7, 13))
      .toBe('Password is actual.');
  });
});
