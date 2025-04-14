'use strict';

const { isPasswordActual } = require('./isPasswordActual');

describe(`Function 'isPasswordActual':`, () => {
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
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toEqual('string');
  });

  describe(`should ask to change the password`, () => {
    it(`if it was changed a year ago`, () => {
      const lastYear = isPasswordActual(
        today.year - 1,
        today.month,
        today.date
      );

      expect(lastYear)
        .toBe('Immediately change the password!');
    });

    it(`if it was changed six months ago`, () => {
      const halfYear = isPasswordActual(
        today.year,
        today.month - 6,
        today.date
      );

      expect(halfYear)
        .toBe('Immediately change the password!');
    });

    it(`if it was changed 61 days ago`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date - 61
      );

      expect(result)
        .toBe('Immediately change the password!');
    });

    it(`if it was changed 60 days ago`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date - 60
      );

      expect(result)
        .toBe('You should change your password.');
    });

    it(`if it was changed 31 days ago`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date - 31
      );

      expect(result)
        .toBe('You should change your password.');
    });
  });

  describe(`checks if the password is actual`, () => {
    it(`if the password was changed on the same day`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date
      );

      expect(result)
        .toBe('Password is actual.');
    });

    it(`if less than 30 days have passed`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date - 29
      );

      expect(result)
        .toBe('Password is actual.');
    });

    it(`if 30 days have passed`, () => {
      const result = isPasswordActual(
        today.year,
        today.month,
        today.date - 30
      );

      expect(result)
        .toBe('Password is actual.');
    });
  });
});
