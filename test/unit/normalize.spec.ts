import { normalize } from '../../src/lib/normalize';

describe('normalize', () => {
  it.each([
    ['John.Doe+news@Gmail.com', 'johndoe@gmail.com'],
    ['a.b@googlemail.com', 'ab@gmail.com'],
    ['Jane+work@hotmail.fr', 'jane@hotmail.fr'],
    ['  Someone@Example.COM ', 'someone@example.com'],
    ['+a@Gmail.com', '+a@gmail.com'],
    ['.@gmail.com', '.@gmail.com'],
  ])('%s -> %s', (input, expected) => {
    expect(normalize(input)).toBe(expected);
  });
});
