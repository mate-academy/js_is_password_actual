'use strict';

const isPasswordActual = require('./isPasswordActual');

describe('Example assertions from task', () => {
  const MOCK_TODAY = new Date('2021-06-10T00:00:00Z');

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_TODAY.getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return "Immediately change the password!"', () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it('should return "Password is actual."', () => {
    expect(isPasswordActual(2021, 6, 1)).toBe('Password is actual.');
  });

  it('should return "You should change your password."', () => {
    expect(isPasswordActual(2021, 5, 1))
      .toBe('You should change your password.');
  });
});
