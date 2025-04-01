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

  it(`should return "Password is actual." if the password was updated today`,
    () => {
      const result = isPasswordActual(today.year, today.month, today.date);

      expect(result).toBe('Password is actual.');
    });

  it(`should return "Password is actual." if password was changed 30 days ago`,
    () => {
      const pastDate = new Date();

      pastDate.setDate(date.getDate() - 30);

      const result = isPasswordActual(pastDate.getFullYear(),
        pastDate.getMonth() + 1, pastDate.getDate());

      expect(result).toBe('Password is actual.');
    });

  it(`should return "You should change your password." 
    if password was changed 31 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(date.getDate() - 31);

    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('You should change your password.');
  });

  it(`should return "You should change your password."
     if password was changed exactly 60 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(date.getDate() - 60);

    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('You should change your password.');
  });

  it(`should return "Immediately change the password!"
     if password was changed 61 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(date.getDate() - 61);

    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('Immediately change the password!');
  });

  it(`should return "Immediately change the password!"
     if password was changed 6 months ago`, () => {
    const pastDate = new Date();

    pastDate.setMonth(date.getMonth() - 6);

    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('Immediately change the password!');
  });

  it(`should return "Immediately change the password!" 
    if password was changed 365 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(date.getDate() - 365);

    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('Immediately change the password!');
  });
});
