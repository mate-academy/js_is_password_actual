'use strict';

const MOCKED_NOW = new Date('2023-10-27T00:00:00Z').getTime();
const originalDateNow = Date.now;

Date.now = () => MOCKED_NOW;

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  afterAll(() => {
    Date.now = originalDateNow;
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string - all is well`, () => {
    expect(isPasswordActual(2023, 9, 27)).toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed 
    more then 30 day ago`, () => {
    expect(isPasswordActual(2023, 9, 26))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed
    more then 60 day ago`, () => {
    expect(isPasswordActual(2023, 8, 27))
      .toBe('Immediately change the password!');
  });
});
