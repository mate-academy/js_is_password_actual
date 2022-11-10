'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(2020, 6, 9);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password immediately 
    if was changed a year ago`, () => {
    expect(isPasswordActual(2021, 11, 10))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately 
    if was changed 60 days ago`, () => {
    expect(isPasswordActual(2022, 9, 10))
      .toBe('Immediately change the password!');
  });

  it(`should return a message to change the password 
    if was changed 59 days ago`, () => {
    expect(isPasswordActual(2022, 9, 11))
      .toBe('You should change your password.');
  });

  it(`should return a message to change the password 
    if was changed 31 days ago`, () => {
    expect(isPasswordActual(2022, 10, 9))
      .toBe('You should change your password.');
  });

  it(`should return a message to change the password 
    if was changed 30 days ago`, () => {
    expect(isPasswordActual(2022, 10, 10))
      .toBe('You should change your password.');
  });

  it(`should return a message the password is actual 
    if was change 29 days ago`, () => {
    expect(isPasswordActual(2022, 10, 11))
      .toBe('Password is actual.');
  });

  it(`should return a messsage the password is actual 
    if was today`, () => {
    expect(isPasswordActual(2022, 11, 11))
      .toBe('Password is actual.');
  });

  // (let it be 2022/11/10 for today):
});
