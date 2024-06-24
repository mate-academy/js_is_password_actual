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

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should return "Password is actual."'
    + 'when the password was changed today', () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it('should return "You should change your password."'
    + 'if the password was changed more than 30 days ago', () => {
    const thirtyOneDaysAgo = new Date(
      today.year, today.month - 1, today.date - 31);
    const result = isPasswordActual(thirtyOneDaysAgo.getFullYear(),
      thirtyOneDaysAgo.getMonth() + 1, thirtyOneDaysAgo.getDate());

    expect(result).toBe('You should change your password.');
  });

  it('should return "Password is actual."'
    + 'when the password was changed 30 days ago', () => {
    const thirtyDaysAgo = new Date(
      today.year, today.month - 1, today.date - 30);
    const result = isPasswordActual(thirtyDaysAgo.getFullYear(),
      thirtyDaysAgo.getMonth() + 1, thirtyDaysAgo.getDate());

    expect(result).toBe('Password is actual.');
  });

  it('should return "You should change your password."'
    + 'when the password was changed 31 days ago', () => {
    const thirtyOneDaysAgo = new Date(
      today.year, today.month - 1, today.date - 31);
    const result = isPasswordActual(thirtyOneDaysAgo.getFullYear(),
      thirtyOneDaysAgo.getMonth() + 1, thirtyOneDaysAgo.getDate());

    expect(result).toBe('You should change your password.');
  });

  it('should return "You should change your password."'
    + 'when the password was changed 60 days ago', () => {
    const sixtyDaysAgo = new Date(today.year, today.month - 1, today.date - 60);
    const result = isPasswordActual(sixtyDaysAgo.getFullYear(),
      sixtyDaysAgo.getMonth() + 1, sixtyDaysAgo.getDate());

    expect(result).toBe('You should change your password.');
  });

  it('should return "Immediately change the password!"'
    + 'when the password was changed 61 days ago', () => {
    const sixtyOneDaysAgo = new Date(
      today.year, today.month - 1, today.date - 61);
    const result = isPasswordActual(sixtyOneDaysAgo.getFullYear(),
      sixtyOneDaysAgo.getMonth() + 1, sixtyOneDaysAgo.getDate());

    expect(result).toBe('Immediately change the password!');
  });

  it('should return "Password is actual."'
    + 'for passwords changed within the last 30 days', () => {
    const withinThirtyDays = new Date(
      today.year, today.month - 1, today.date - 15);
    const result = isPasswordActual(withinThirtyDays.getFullYear(),
      withinThirtyDays.getMonth() + 1, withinThirtyDays.getDate());

    expect(result).toBe('Password is actual.');
  });

  it('should return "You should change your password."'
    + 'for passwords changed between 31 and 60 days ago', () => {
    const withinThirtyToSixtyDays = new Date(
      today.year, today.month - 1, today.date - 45);
    const result = isPasswordActual(withinThirtyToSixtyDays.getFullYear(),
      withinThirtyToSixtyDays.getMonth() + 1,
      withinThirtyToSixtyDays.getDate());

    expect(result).toBe('You should change your password.');
  });

  it('should return "Immediately change the password!"'
    + 'for passwords changed more than 60 days ago', () => {
    const beyondSixtyDays = new Date(
      today.year, today.month - 1, today.date - 75);
    const result = isPasswordActual(beyondSixtyDays.getFullYear(),
      beyondSixtyDays.getMonth() + 1, beyondSixtyDays.getDate());

    expect(result).toBe('Immediately change the password!');
  });
});
