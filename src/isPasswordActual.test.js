'use strict';

describe('isPasswordActual', () => {
  const isPasswordActual = require('./isPasswordActual');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-01'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const today = {
    year: 2023,
    month: 1,
    date: 1,
  };

  const daysAgo = (n) => {
    const date = new Date('2023-01-01');

    date.setDate(date.getDate() - n);

    return date;
  };

  it('should be a function', () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it('should return a string', () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(
    'returns "Immediately change the password!" if last changed a year ago',
    () => {
      const lastYear = isPasswordActual(
        today.year - 1,
        today.month,
        today.date
      );

      expect(lastYear).toBe('Immediately change the password!');
    }
  );

  it(
    'returns "Immediately change the password!" for 2020-01-01',
    () => {
      const result = isPasswordActual(2020, 1, 1);

      expect(result).toBe('Immediately change the password!');
    }
  );

  it(
    'returns "You should change your password." if changed 40 days ago',
    () => {
      const d = daysAgo(40);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('You should change your password.');
    }
  );

  it(
    'returns "Password is actual." if changed 10 days ago',
    () => {
      const d = daysAgo(10);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('Password is actual.');
    }
  );

  it(
    'returns "Password is actual." if changed 30 days ago',
    () => {
      const d = daysAgo(30);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('Password is actual.');
    }
  );

  it(
    'returns "You should change your password." if changed 31 days ago',
    () => {
      const d = daysAgo(31);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('You should change your password.');
    }
  );

  it(
    'returns "You should change your password." if changed 60 days ago',
    () => {
      const d = daysAgo(60);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('You should change your password.');
    }
  );

  it(
    'returns "Immediately change the password!" if changed 61 days ago',
    () => {
      const d = daysAgo(61);

      const res = isPasswordActual(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      expect(res).toBe('Immediately change the password!');
    }
  );
});
