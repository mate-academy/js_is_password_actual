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
    expect(typeof(isPasswordActual(date))).toBe('string');
  });

  it(`should request password change if was changed a year ago`, () => {
    const lastUpdate = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastUpdate)
      .toBe('Immediately change the password!');
  });
  
  it(`should request password change if last changed was more than 60 days`, () => {
    const lastUpdate = isPasswordActual(today.year, today.month - 2, today.date - 1);

    expect(lastUpdate)
      .toBe('Immediately change the password!');
  });
  
  it(`should return actual if last changed was 30 days or less`, () => {
    const lastUpdate = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastUpdate)
      .toBe('Password is actual.');
  });
  
  it(`should return ask to change password if last changed was more than 30 days`, () => {
    const lastUpdate = isPasswordActual(today.year, today.month - 1, today.date - 1);

    expect(lastUpdate)
      .toBe('You should change your password.');
  });
});
