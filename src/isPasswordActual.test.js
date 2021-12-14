'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(`should return 'Immediately change the password!' if password was changed 
  61 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 61);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('Immediately change the password!');
  });

  it(`should return 'You should change your password.' if password was changed 
    60 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 60);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('You should change your password.');
  });

  it(`should return 'You should change your password.' if password was changed 
    59 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 59);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('You should change your password.');
  });

  it(`should return 'You should change your password.' if password was changed 
    31 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 31);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual.' if password was changed 
    30 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 30);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if password was changed 
    29 days ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 29);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if password was changed 
    1 day ago`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 1);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = date1.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('Password is actual.');
  });

  it(`should return 'Immediately change the password!' if one of 
    the inputs is 0`, () => {
    const date1 = new Date();

    date1.setDate(date1.getDate() - 61);

    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const date = 0;

    expect(isPasswordActual(year, month, date))
      .toBe('Immediately change the password!');
  });
});
