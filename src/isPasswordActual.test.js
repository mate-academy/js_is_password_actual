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
    expect(typeof (isPasswordActual())).toEqual('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately
   if was changed 2 months ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month - 2, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately
  if was changed 2 months and 1 day ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month - 2, today.date - 1);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if was changed 1 months and 29 day ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month - 1, today.date - 29);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password 
  if was changed 1 months and 15 day ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month - 1, today.date - 15);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password 
  if was changed 1 months ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month - 1, today.date);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual'
  if was changed 15 days ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month, today.date - 15);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual'
  if was changed 29 days ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month, today.date - 29);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual'
  if was changed 1 days ago`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month, today.date - 1);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual'
  if was changed today`, () => {
    const lastYear = isPasswordActual(today.year,
      today.month, today.date);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
