// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

import path from 'path';

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(false),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinFake = jest.spyOn(path, 'join');
    const mockPathToFile = 'test.txt';

    await readFileAsynchronously(mockPathToFile);

    expect(joinFake).toHaveBeenCalledWith(__dirname, mockPathToFile);

    joinFake.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const existsSyncFake = jest.mocked(existsSync);
    const readFileFake = jest.mocked(readFile);

    const result = await readFileAsynchronously('non-exist.txt');

    expect(result).toBeNull();
    expect(existsSyncFake).toHaveBeenCalled();
    expect(readFileFake).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const existsSyncFake = jest.mocked(existsSync);
    const readFileFake = jest.mocked(readFile);

    existsSyncFake.mockReturnValue(true);
    readFileFake.mockResolvedValue('some text');

    const result = await readFileAsynchronously('exist.txt');

    expect(result).toBe('some text');
    expect(existsSyncFake).toHaveBeenCalled();
    expect(readFileFake).toHaveBeenCalled();
  });
});
