'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9))
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if it was changed more than year ago`, () => {
    expect(isPasswordActual(2020, 1, 1))
      .toBe('Immediately change the password!');
  });

  it(`should inform about immediately changes of the password
  if it was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 23))
      .toBe('Immediately change the password!');
  });

  it(`should inform about immediately changes of the password
  if it was changed more than 61 days ago`, () => {
    expect(isPasswordActual(2021, 8, 22))
      .toBe('Immediately change the password!');
  });

  it(`should inform about password is actual 
   if it was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 25))
      .toBe('Password is actual.');
  });

  it(`should inform You should change your password 
   if it was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 23))
      .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password 
  if it was changed 29 days ago`, () => {
    expect(isPasswordActual(2021, 9, 25))
      .toBe('Password is actual.');
  });

});
