'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9))
      .toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const actualDate = new Date();
    const year = actualDate.getFullYear() - 1;
    const month = actualDate.getMonth();
    const date = actualDate.getDate();

    expect(isPasswordActual(year, month, date))
      .toBe('Immediately change the password!');
  });

  // write more tests here
  it(`returns the message 'Password is actual.'
  if 30 days have passed since the last password change`, () => {
    const moment = require('moment');
    const actualDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const year = +actualDate.slice(0, 4);
    const month = +actualDate.slice(5, 7);
    const date = +actualDate.slice(8);

    expect(isPasswordActual(year, month, date))
      .toBe('Password is actual.');
  });

  it(`returns the message 'You should change your password.'
  if 31 days have passed since the last password change`, () => {
    const moment = require('moment');
    const actualDate = moment().subtract(31, 'days').format('YYYY-MM-DD');
    const year = +actualDate.slice(0, 4);
    const month = +actualDate.slice(5, 7);
    const date = +actualDate.slice(8);

    expect(isPasswordActual(year, month, date))
      .toBe('You should change your password.');
  });

  it(`returns the message 'You should change your password.'
  if 60 days have passed since the last password change`, () => {
    const moment = require('moment');
    const actualDate = moment().subtract(60, 'days').format('YYYY-MM-DD');
    const year = +actualDate.slice(0, 4);
    const month = +actualDate.slice(5, 7);
    const date = +actualDate.slice(8);

    expect(isPasswordActual(year, month, date))
      .toBe('You should change your password.');
  });

  it(`returns the message 'Immediately change the password!'
  if 61 days have passed since the last password change`, () => {
    const moment = require('moment');
    const actualDate = moment().subtract(61, 'days').format('YYYY-MM-DD');
    const year = +actualDate.slice(0, 4);
    const month = +actualDate.slice(5, 7);
    const date = +actualDate.slice(8);

    expect(isPasswordActual(year, month, date))
      .toBe('Immediately change the password!');
  });
});
