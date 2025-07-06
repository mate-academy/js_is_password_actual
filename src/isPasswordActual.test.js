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
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('If 30 days or less have passed since the last password change, '
  + 'the function returns the message: \'Password is actual.\'', () => {
    expect(isPasswordActual(today.year, today.month, today.date))
      .toBe('Password is actual.');
  });

  it('If more than 30 days have passed since the last password change, the func'
    + 'tion returns the message: \'You should change your password.\'', () => {
    const dateCopy = new Date();

    dateCopy.setDate(dateCopy.getDate() - 31);

    expect(isPasswordActual(
      dateCopy.getFullYear(), dateCopy.getMonth() + 1, dateCopy.getDate()))
      .toBe('You should change your password.');
  });

  it('If more than 60 days have passed since the last password change, the func'
    + 'tion returns the message: \'Immediately change the password!\'', () => {
    const dateCopy = new Date();

    dateCopy.setDate(dateCopy.getDate() - 61);

    expect(isPasswordActual(
      dateCopy.getFullYear(), dateCopy.getMonth() + 1, dateCopy.getDate()))
      .toBe('Immediately change the password!');
  });
});
