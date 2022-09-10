'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  it(`should ask to change the password immediately
  if it was changed a year ago`, () => {
    expect(isPasswordActual(2021, 9, 10))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately
  if it was changed 6 months ago`, () => {
    expect(isPasswordActual(2022, 3, 10))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately
  if it was changed 61 days ago`, () => {
    expect(isPasswordActual(2022, 7, 10))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately
  if it was changed 60 days ago`, () => {
    expect(isPasswordActual(2022, 7, 11))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if it was changed 59 days ago`, () => {
    expect(isPasswordActual(2022, 7, 12))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password 
  if it was changed 30 days ago`, () => {
    expect(isPasswordActual(2022, 8, 10))
      .toBe('You should change your password.');
  });

  it(`shouldn't ask to change the password 
  if it was changed 29 days ago`, () => {
    expect(isPasswordActual(2022, 8, 11))
      .toBe('Password is actual.');
  });

  it(`shouldn't ask to change the password 
  if it was changed 14 days ago`, () => {
    expect(isPasswordActual(2022, 8, 28))
      .toBe('Password is actual.');
  });

  it(`shouldn't ask to change the password 
  if it was changed today days ago`, () => {
    expect(isPasswordActual(2022, 9, 10))
      .toBe('Password is actual.');
  });
});
