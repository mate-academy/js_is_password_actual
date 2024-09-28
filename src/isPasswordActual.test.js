'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {});

  it(`should ask to change the password if was changed a year ago`, () => {
    const today = {
      year: date.getUTCFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    };

    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  // write more tests here

  it(`should say password is actual`, () => {
    const day = new Date();

    day.setDate(day.getDate() - 5);

    const formattedDate = day
      .toISOString()
      .split('T')[0]
      .split('-')
      .map(Number);

    const lastYear = isPasswordActual(
      formattedDate[0],
      formattedDate[1],
      formattedDate[2]
    );

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed
    over 30 days ago and less than 60 `, () => {
    const day = new Date();

    day.setDate(day.getDate() - 45);

    const formattedDate = day
      .toISOString()
      .split('T')[0]
      .split('-')
      .map(Number);

    const lastYear = isPasswordActual(
      formattedDate[0],
      formattedDate[1],
      formattedDate[2]
    );

    expect(lastYear).toBe('You should change your password.');
  });

  it(`should ask to Immediately change the password if
    was changed over 60 days ago`, () => {
    const day = new Date();

    day.setDate(day.getDate() - 65);

    const formattedDate = day
      .toISOString()
      .split('T')[0]
      .split('-')
      .map(Number);

    const lastYear = isPasswordActual(
      formattedDate[0],
      formattedDate[1],
      formattedDate[2]
    );

    expect(lastYear).toBe('Immediately change the password!');
  });
});
