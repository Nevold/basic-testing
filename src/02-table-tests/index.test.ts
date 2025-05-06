// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    test.each([
      { a: 1, b: 2, action: Action.Add, expected: 3 },
      { a: 2, b: 2, action: Action.Add, expected: 4 },
      { a: 3, b: 2, action: Action.Add, expected: 5 },

      { a: 5, b: 3, action: Action.Subtract, expected: 2 },
      { a: 10, b: 0, action: Action.Subtract, expected: 10 },
      { a: 3, b: 5, action: Action.Subtract, expected: -2 },

      { a: 5, b: 3, action: Action.Multiply, expected: 15 },
      { a: 10, b: 0, action: Action.Multiply, expected: 0 },
      { a: 3, b: -2, action: Action.Multiply, expected: -6 },

      { a: 6, b: 3, action: Action.Divide, expected: 2 },
      { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
      { a: 10, b: 1, action: Action.Divide, expected: 10 },

      { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
      { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
      { a: 3, b: 1, action: Action.Exponentiate, expected: 3 },
    ])(
      '$a $action $b should return $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid operations', () => {
    test.each([
      { a: 'a', b: 2, action: Action.Add },
      { a: 1, b: '2', action: Action.Subtract },
      { a: true, b: false, action: Action.Multiply },
      { a: null, b: undefined, action: Action.Divide },
      { a: 2, b: 3, action: 'invalid' },
      { a: 2, b: 3, action: undefined },
    ])('should return null for invalid input %p', (input) => {
      const result = simpleCalculator(input);
      expect(result).toBeNull();
    });
  });
});
