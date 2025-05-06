// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 10;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 10;
    const account = getBankAccount(balance);

    expect(() => account.withdraw(15)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(15)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const firstAccount = getBankAccount(10);
    const secondAccount = getBankAccount(5);
    const transfer = 15;

    expect(() => firstAccount.transfer(transfer, secondAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => firstAccount.transfer(transfer, secondAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${firstAccount.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);

    expect(() => account.transfer(5, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(5, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const balance = 10;
    const deposit = 5;
    const account = getBankAccount(balance);
    account.deposit(deposit);
    expect(account.getBalance()).toBe(deposit + balance);
  });

  test('should withdraw money', () => {
    const balance = 10;
    const withdraw = 5;
    const account = getBankAccount(balance);
    account.withdraw(withdraw);
    expect(account.getBalance()).toBe(balance - withdraw);
  });

  test('should transfer money', () => {
    const balance = 10;
    const transfer = 5;
    const account = getBankAccount(balance);
    const otherAccount = getBankAccount(balance);
    account.transfer(transfer, otherAccount);
    expect(account.getBalance()).toBe(balance - transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
