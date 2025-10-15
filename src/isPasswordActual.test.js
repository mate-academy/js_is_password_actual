'use strict';

const isPasswordActual = require('./isPasswordActual');

describe('isPasswordActual', () => {
  const MOCK_TODAY = new Date('2024-06-10T00:00:00Z');

  beforeAll(() => {
    // заменить поведение на другое
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_TODAY.getTime());
    // jest.spyOn() принимает имя метода строкой, Date['now']
  });

  afterAll(() => {
    jest.restoreAllMocks();
    // мы подменяли Date.now. Теперь нужно вернуть всё как было.
  });

  function getPastDate(daysAgo) {
    const date = new Date(MOCK_TODAY);
    date.setDate(date.getDate() - daysAgo);
    // Создаём копию зафиксированной даты (чтобы не портить оригинал).
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    };
  }

  it(`should return "Password is actual." for today (0 days ago)`, () => {
    const today = getPastDate(0);
    expect(isPasswordActual(today.year, today.month, today.date))
      .toBe('Password is actual.');
  });

  it(`should return "Password is actual." for 30 days ago`, () => {
    const past = getPastDate(30);
    expect(isPasswordActual(past.year, past.month, past.date))
      .toBe('Password is actual.');
  });

  it(`should return "You should change your password." for 31 days ago`, () => {
    const past = getPastDate(31);
    expect(isPasswordActual(past.year, past.month, past.date))
      .toBe('You should change your password.');
  });

  it(`should return "You should change your password." for 45 days ago`, () => {
    const past = getPastDate(45);
    expect(isPasswordActual(past.year, past.month, past.date))
      .toBe('You should change your password.');
  });

  it(`should return "Immediately change the password!" for 61 days ago`, () => {
    const past = getPastDate(61);
    expect(isPasswordActual(past.year, past.month, past.date))
      .toBe('Immediately change the password!');
  });

  it(`should return "Immediately change the password!" for a year ago`, () => {
    const past = getPastDate(365);
    expect(isPasswordActual(past.year, past.month, past.date))
      .toBe('Immediately change the password!');
  });
});
