'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year - 1, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // write more tests here

  it('should write that password is actual if less than 30 days passed', () => {
    const pData = new Date(date.getDate() - 25);

    const result = isPasswordActual(date.getFullYear(),

      date.getMonth() + 1, pData);

    expect(result).toBe('Password is actual.');
  });

  it('should write `change the password` if more than 30 days passed', () => {
    const pData = new Date(date.getDate() - 25);

    const result = isPasswordActual(date.getFullYear(),

      date.getMonth(), pData);

    expect(result).toBe('You should change your password.');
  });

  it('should write `change the password immediately`'

      + 'if more than 60 days passed', () => {
    const pData = new Date(date.getDate() - 25);

    const result = isPasswordActual(date.getFullYear(),

      date.getMonth() - 1, pData);

    expect(result).toBe('Immediately change the password!');
  });
});
