'use strict';

describe("Function 'isPasswordActual'", () => {
  const isPasswordActual = require('./isPasswordActual');
  const today = new Date();

  it('should be declared', () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it('should return a string', () => {
    const result = isPasswordActual(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    expect(typeof result).toBe('string');
  });

  it("should return 'Password is actual.'"
    + 'when password is updated today', () => {
    const result = isPasswordActual(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it("should return 'You should change your password.'"
    + 'when password is older than 30 but not more than 60 days', () => {
    const date = new Date(today.getTime() - 31 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it("should return 'Immediately change the password!'"
    + 'when password is older than 60 days', () => {
    const date = new Date(today.getTime() - 61 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    expect(result).toBe('Immediately change the password!');
  });

  it("should treat exactly 30 days as 'Password is actual.'", () => {
    const date = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it('should treat exactly 60 days'
    + "as 'You should change your password.'", () => {
    const date = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    expect(result).toBe('You should change your password.');
  });
});
