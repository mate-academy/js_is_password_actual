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
    const result = isPasswordActual(2025, 7, 11);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`Should change the password if it is older than 60 days`, () => {
    const veryOld = new Date();

    veryOld.setDate(veryOld.getDate() - 80);

    const result = isPasswordActual(
      veryOld.getUTCFullYear(),
      veryOld.getMonth() + 1,
      veryOld.getDate());

    expect(result).toBe('Immediately change the password!');
  });

  it(`Should change the password if it is older than 30 days`, () => {
    const old = new Date();

    old.setDate(old.getDate() - 40);

    const result = isPasswordActual(
      old.getUTCFullYear(),
      old.getMonth() + 1,
      old.getDate());

    expect(result).toBe('You should change your password.');
  });

  it(`should say to change the password if it was changed 31 days`, () => {
    const earlyOld = new Date();

    earlyOld.setDate(earlyOld.getDate() - 31);

    const result = isPasswordActual(
      earlyOld.getFullYear(),
      earlyOld.getMonth() + 1,
      earlyOld.getDate());

    expect(result).toBe('You should change your password.');
  });

  it(`should confirm password if was changed exactly 30 days`, () => {
    const recent = new Date();

    recent.setDate(recent.getDate() - 30);

    const result = isPasswordActual(
      recent.getUTCFullYear(),
      recent.getMonth() + 1,
      recent.getDate());

    expect(result).toBe('Password is actual.');
  });

  it(`should confirm password is actual if within 30 days`, () => {
    const notOld = new Date();

    notOld.setDate(notOld.getDate() - 20);

    const result = isPasswordActual(
      notOld.getFullYear(),
      notOld.getMonth() + 1,
      notOld.getDate());

    expect(result).toBe('Password is actual.');
  });

  // write more tests here
});
