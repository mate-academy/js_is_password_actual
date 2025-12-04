'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2021-06-10'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should warn user to change password after 1 month`, () => {
    const result = isPasswordActual(2021, 5, 15);

    expect(result).toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(2020, 5, 10);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should confirm password is still actual`, () => {
    const lastMonth = isPasswordActual(2021, 6, 10);

    expect(lastMonth).toBe('Password is actual.');
  });
});
