'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  const MOCKED_NOW = new Date(2021, 5, 10).getTime();
  let realDateNow;

  beforeAll(() => {
    realDateNow = Date.now;
    Date.now = jest.fn(() => MOCKED_NOW);
  });

  afterAll(() => {
    Date.now = realDateNow;
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should warn user to change password after 1 month`, () => {
    const result = isPasswordActual(2021, 5, 1);

    expect(result).toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(2020, 5, 9);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should confirm password is still actual`, () => {
    const lastMonth = isPasswordActual(2021, 6, 1);

    expect(lastMonth).toBe('Password is actual.');
  });
});
