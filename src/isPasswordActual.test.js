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

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return 'Password is actual.'
   if less than or equal to 30 days have passed since 
   the last password change`, () => {
    const within30Days = isPasswordActual(today.year,
      today.month, today.date - 30);

    expect(within30Days).toBe('Password is actual.');

    const oneDayAgo = isPasswordActual(today.year,
      today.month, today.date - 1);

    expect(oneDayAgo).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' 
  if more than 30 days have passed since the last password change`,
  () => {
    const moreThan30Days = isPasswordActual(today.year,
      today.month, today.date - 31);

    expect(moreThan30Days).toBe('You should change your password.');

    const oneMonthAgo = isPasswordActual(today.year,
      today.month - 1, today.date);

    expect(oneMonthAgo).toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!'
   if more than 60 days have passed since the last password change`,
  () => {
    const moreThan60Days = isPasswordActual(today.year,
      today.month, today.date - 61);

    expect(moreThan60Days).toBe('Immediately change the password!');

    const twoMonthsAgo = isPasswordActual(today.year,
      today.month - 2, today.date);

    expect(twoMonthsAgo).toBe('Immediately change the password!');
  });
});
