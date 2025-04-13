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
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe('string');
  });
  it(`should ask to change the password 
  if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);
    expect(lastYear).toBe('Immediately change the password!');
  });
  it(`should ask to change the password if more than 
  60 days have passed since the last change`, () => {
    const moreThan60DaysAgo = isPasswordActual(today.year, today.month - 2, today.date);
    expect(moreThan60DaysAgo).toBe('Immediately change the password!');
  });
  it(`should ask to change the password 
  if 31 days have passed since the last change`, () => {
    const moreThan30DaysAgo = isPasswordActual(today.year, today.month - 1, today.date);
    expect(moreThan30DaysAgo).toBe('Immediately change the password!');
  });
  it(`should ask to change the password 
  if exactly 30 days have passed since the last change`, () => {
    const exactly30DaysAgo = isPasswordActual(today.year, today.month - 1, today.date - 1);
    expect(exactly30DaysAgo).toBe('Immediately change the password!');
  });
  it(`should not ask to change the password 
  if exactly 30 days have passed since the last change`, () => {
    const lessThan30DaysAgo = isPasswordActual(today.year, today.month - 1, today.date + 1);
    expect(lessThan30DaysAgo).toBe('Password is actual.');
  });
  it(`should ask to change the password 
  if more than 30 days have passed since the last change`, () => {
    const moreThan30DaysAgo = isPasswordActual(today.year, today.month - 2, today.date);
    expect(moreThan30DaysAgo).toBe('You should change your password.');
  });
});
