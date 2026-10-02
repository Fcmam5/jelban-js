import { isDisposable } from '../../src/lib/isDisposable';

describe('isDisposable', () => {
  it.each(['kavi@boxomail.live', 'a@MOHMAL.com', 'a@sub.10minutemail.com', ' a@mohmal.com '])(
    'should return true for %s',
    (emailAddress) => {
      expect(isDisposable(emailAddress)).toBe(true);
    },
  );

  it.each(['alice@gmail.com', 'alice@notmohmal.com', 'not-an-email'])('should return false for %s', (emailAddress) => {
    expect(isDisposable(emailAddress)).toBe(false);
  });

  it.each([[undefined], [null], [123], [{}], [['a@mohmal.com']]])('should throw a TypeError for %p', (input) => {
    expect(() => isDisposable(input as unknown as string)).toThrow(TypeError);
  });

  it('should return quickly for absurdly long domains', () => {
    const start = Date.now();

    expect(isDisposable(`x@${'a.'.repeat(50_000)}com`)).toBe(false);
    expect(Date.now() - start).toBeLessThan(100);
  });
});
