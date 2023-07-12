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
    expect(typeof isPasswordActual(2021, 6, 1)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately`
  + ` if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should not ask to change the password'
  + ' if was changed less then 30 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 20,
    );

    expect(dateForCompare).toBe('Password is actual.');
  });

  it('should not ask to change the password'
  + ' if was changed 30 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 30,
    );

    expect(dateForCompare).toBe('Password is actual.');
  });

  it('should ask to change the password'
  + ' if was changed more then 30 and less then 60 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month - 2,
      today.date + 10,
    );

    expect(dateForCompare).toBe('You should change your password.');
  });

  it('should ask to change the password'
  + ' if was changed 60 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month,
      today.date - 60,
    );

    expect(dateForCompare).toBe('You should change your password.');
  });

  it('should ask to change the password immediately'
  + ' if was changed more then 60 days ago', () => {
    const dateForCompare = isPasswordActual(
      today.year,
      today.month - 4,
      today.date,
    );

    expect(dateForCompare).toBe('Immediately change the password!');
  });
});
