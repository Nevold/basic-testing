// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve with the provided value', async () => {
    await expect(resolveValue(22)).resolves.toBe(22);
    await expect(resolveValue('test')).resolves.toBe('test');
    await expect(resolveValue(null)).resolves.toBeNull();
    await expect(resolveValue(undefined)).resolves.toBeUndefined();
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Error message')).toThrow('Error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
