import { getDomain, matchesDomain, toDomainSet } from '../../../../src/lib/helpers/email-addresses';

describe('getDomain', () => {
  it.each([
    ['a@Example.COM', 'example.com'],
    ['  a@example.com  ', 'example.com'],
    ['a@b@example.com', 'example.com'],
    ['no-at-sign', ''],
    ['', ''],
  ])('getDomain(%j) => %j', (input, expected) => {
    expect(getDomain(input)).toBe(expected);
  });

  it.each([[undefined], [null], [123], [{}], [['a@example.com']]])('should throw a TypeError for %j', (input) => {
    expect(() => getDomain(input as unknown as string)).toThrow(TypeError);
  });
});

describe('matchesDomain', () => {
  const domains = toDomainSet(['Mohmal.com']);

  it('should match exact domains and subdomains', () => {
    expect(matchesDomain('mohmal.com', domains)).toBe(true);
    expect(matchesDomain('a.b.mohmal.com', domains)).toBe(true);
  });

  it('should not match lookalikes', () => {
    expect(matchesDomain('notmohmal.com', domains)).toBe(false);
    expect(matchesDomain('mohmal.com.evil.io', domains)).toBe(false);
  });

  it('should return quickly for absurdly long domains', () => {
    const domain = `${'a.'.repeat(50_000)}mohmal.com`;
    const start = Date.now();

    expect(matchesDomain(domain, domains)).toBe(false);
    expect(Date.now() - start).toBeLessThan(100);
  });
});
