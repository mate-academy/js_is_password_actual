'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const RealDate = Date;

  beforeEach(() => {
    global.Date = jest.fn((...args) => {
      if (args.length) {
        return new RealDate(...args);
      }

      return new RealDate(2021, 5, 10);
    });
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return string`, () => {
    expect(typeof isPasswordActual(2021, 6, 1)).toBe('string');
  });

  it(`should return 'Password is actual.' if 30 days or less passed`, () => {
    expect(isPasswordActual(2021, 6, 1)).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' if more than 30 days passed`, () => {
    expect(isPasswordActual(2021, 5, 1)).toBe(
      'You should change your password.',
    );
  });

  it(`should return 'Immediately change the password!' if more than 60 days passed`, () => {
    expect(isPasswordActual(2020, 6, 9)).toBe(
      'Immediately change the password!',
    );
  });
});
