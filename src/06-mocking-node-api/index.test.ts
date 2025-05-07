// Uncomment the code below and write your tests
import {
  // readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn(() => {});
    const timeout = 500;

    const setTimeoutFake = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);

    expect(setTimeoutFake).toHaveBeenCalledTimes(1);
    expect(setTimeoutFake).toHaveBeenLastCalledWith(
      expect.any(Function),
      timeout,
    );

    setTimeoutFake.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 500;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const interval = 500;

    const setTimeoutFake = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackMock, interval);

    expect(setTimeoutFake).toHaveBeenCalledTimes(1);
    expect(setTimeoutFake).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );

    setTimeoutFake.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
