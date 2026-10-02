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
});
