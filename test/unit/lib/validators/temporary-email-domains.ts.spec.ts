import { isDisposable } from '../../../../src/lib/isDisposable';
import domains from '../../../../src/lib/validators/temporary-email-domains';

const legitProviders = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'ymail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'protonmail.com',
  'proton.me',
  'pm.me',
  'aol.com',
  'gmx.com',
  'gmx.net',
  'mail.com',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'zoho.com',
  'fastmail.com',
  'hey.com',
  'tutanota.com',
  'qq.com',
  '163.com',
  '126.com',
  'naver.com',
  'web.de',
  'orange.fr',
  'free.fr',
  'comcast.net',
  'verizon.net',
  'att.net',
];

describe('Disposable email domains list', () => {
  it('should not have duplicates', () => {
    expect(domains.length).toEqual(new Set(domains).size);
  });

  it('should be frozen so consumers cannot mutate the shared list', () => {
    expect(Object.isFrozen(domains)).toBe(true);
  });

  it('should only contain lowercase hostnames', () => {
    const invalid = domains.filter(
      (d) => !/^[a-z0-9.-]+$/.test(d) || !d.includes('.') || d.startsWith('.') || d.endsWith('.'),
    );

    expect(invalid).toEqual([]);
  });

  it.each(legitProviders)('should not block the legitimate provider %s', (domain) => {
    expect(isDisposable(`user@${domain}`)).toBe(false);
  });
});
