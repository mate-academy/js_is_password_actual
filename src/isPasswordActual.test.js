'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {

  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  // write more tests here

  it(`should ask to change the password immediately if it was changed
      61 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 61);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('Immediately change the password!');
  });

  it(`should return 'You should change your password.' if it was changed
  60 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 60);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('You should change your password.');
  });

  it(`should return 'You should change your password.' if it was changed
      59 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 59);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('You should change your password.');
  });

  it(`should return 'You should change your password.' if it was changed
  31 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 31);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('You should change your password.');
  });

  it(`should return 'Password is actual' if it was changed 
  30 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 30);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('Password is actual.');
  });

  it(`should return 'Password is actual' if it was changed 
      29 days ago `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() - 29);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('Password is actual.');
  });

  it(`should return 'Password is actual' if password is set tomorrow `, () => {
    const actualDate = new Date(Date.now());

    actualDate.setDate(actualDate.getDate() + 1);// implicitely month,year

    expect(isPasswordActual(actualDate.getFullYear(), actualDate.getMonth() + 1,
      actualDate.getDate())).toBe('Password is actual.');
  });
});
