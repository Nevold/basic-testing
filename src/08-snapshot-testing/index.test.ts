// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expected);

    const resultEmpty = generateLinkedList([]);
    expect(resultEmpty).toStrictEqual({ value: null, next: null });
  });

  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
