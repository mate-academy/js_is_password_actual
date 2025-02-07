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
    expect(typeof isPasswordActual(2018, 11, 8)).toBe('string');
  });

  it(`should change the password if was changed a year ago`, () => {
    const lastYear
      = isPasswordActual(today.year - 1, today.month - 1, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should not enter future date', () => {
    expect(isPasswordActual(today.year, today.month, today.date + 1))
      .toBe('Please enter a valid date');
  });

  it('should not enter "year" equal to 0', () => {
    expect(isPasswordActual(0, today.month, today.date + 1))
      .toBe('Please enter a valid date');
  });

  it('should not enter "year" less than 0', () => {
    expect(isPasswordActual(-1, today.month, today.date + 1))
      .toBe('Please enter a valid date');
  });

  it('should not enter "month" equal to 0 ', () => {
    expect(isPasswordActual(today.year, 0, today.date))
      .toBe('Please enter a valid date');
  });

  it('should not enter "month" less than 0', () => {
    expect(isPasswordActual(today.year, -1, today.date))
      .toBe('Please enter a valid date');
  });

  it('should not enter "day" equal to 0', () => {
    expect(isPasswordActual(today.year, today.month, 0))
      .toBe('Please enter a valid date');
  });

  it('should not enter "day" less than 0', () => {
    expect(isPasswordActual(today.year, today.month, -1))
      .toBe('Please enter a valid date');
  });

  it('should enter only whole "year"/"month"/"day"', () => {
    expect(isPasswordActual(2015.5, 11.2, 1.2))
      .toBe('Please enter a valid date');
  });

  it('should enter only correct number of months', () => {
    expect(isPasswordActual(2015, 13, 1))
      .toBe('Please enter a valid date');
  });

  it('should enter only correct number of days', () => {
    expect(isPasswordActual(2015, 11, 32))
      .toBe('Please enter a valid date');
  });

  it('should return Password is actual.'
    + ' when the date is 30 or less days from the actual date', () => {
    expect(isPasswordActual(today.year, today.month - 1, today.date))
      .toBe('Password is actual.');
  });

  it('should return You should change your password.'
    + ' when the date is 31 or but less '
    + 'than 61 days from the actual date', () => {
    expect(isPasswordActual(today.year - 1, 12, today.date + 10))
      .toBe('You should change your password.');
  });

  it('should return Immediately change the password!'
    + ' when the date is 61 or more days from the actual date', () => {
    expect(isPasswordActual(today.year, today.month - 2, today.date + 1))
      .toBe('Immediately change the password!');
  });
});
