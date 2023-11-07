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

  });

  it('should ask to Immediately change the password'
  + 'if was changed a year ago', () => {
    const lastYear = isPasswordActual(
      today.year - 1,
      today.month,
      today.date
    );

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should ask to Immediately change the password'
  + 'if was changed a 61 ago', () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month,
      today.date - 61
    );

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should recomend to change the password'
  + 'if was changed 60 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 60
    );

    expect(dateForCompare)
      .toBe('You should change your password.');
  });

  it('should recomend to change the password'
  + 'if was changed 45 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 45
    );

    expect(dateForCompare)
      .toBe('You should change your password.');
  });

  it('should recomend to change the password'
  + 'if was changed 31 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 31
    );

    expect(dateForCompare)
      .toBe('You should change your password.');
  });

  it('should not ask to change the password'
  + 'if was changed 30 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 30

    );

    expect(dateForCompare)
      .toBe('Password is actual.');
  });

  it('should not ask to change the password'
  + 'if was changed 10 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 10
    );

    expect(dateForCompare)
      .toBe('Password is actual.');
  });
});
