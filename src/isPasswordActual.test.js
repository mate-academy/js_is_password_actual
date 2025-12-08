'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  const FIXED_DATE = new Date(2021, 5, 10);
  const RealDate = Date;

  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation((...args) => {
      if (args.length === 0) {
        return FIXED_DATE;
      }

      return new RealDate(...args);
    });

    global.Date.now = () => FIXED_DATE.getTime();
    global.Date.parse = RealDate.parse;
    global.Date.UTC = RealDate.UTC;
  });

  afterAll(() => {
    global.Date.mockRestore();
  });

  it('should be declared', () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it('should match the example: password from 2020-06-09 is expired', () => {
    expect(isPasswordActual(2020, 6, 9)).toBe(
      'Immediately change the password!'
    );
  });

  it('should match the example: '
    + 'password from 2021-06-01 is still actual', () => {
    expect(isPasswordActual(2021, 6, 1)).toBe('Password is actual.');
  });

  it('should match the example: '
    + 'password from 2021-05-01 should be changed', () => {
    expect(isPasswordActual(2021, 5, 1)).toBe(
      'You should change your password.'
    );
  });

  it(`should return 'Password is actual.' when updated today`, () => {
    expect(isPasswordActual(2021, 6, 10)).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' '
    + 'when password is 31 days old`, () => {
    const d = new Date(2021, 5, 10);

    d.setDate(d.getDate() - 31);

    expect(
      isPasswordActual(d.getFullYear(), d.getMonth() + 1, d.getDate())
    ).toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!' '
    + 'when password is 61 days old`, () => {
    const d = new Date(2021, 5, 10);

    d.setDate(d.getDate() - 61);

    expect(
      isPasswordActual(d.getFullYear(), d.getMonth() + 1, d.getDate())
    ).toBe('Immediately change the password!');
  });

  it('should treat exactly 30 days old as actual', () => {
    const d = new Date(2021, 5, 10);

    d.setDate(d.getDate() - 30);

    expect(
      isPasswordActual(d.getFullYear(), d.getMonth() + 1, d.getDate())
    ).toBe('Password is actual.');
  });

  it('should treat exactly 60 days old as should-change', () => {
    const d = new Date(2021, 5, 10);

    d.setDate(d.getDate() - 60);

    expect(
      isPasswordActual(d.getFullYear(), d.getMonth() + 1, d.getDate())
    ).toBe('You should change your password.');
  });
});
