import { GmailProvider } from '../../../../src/lib/providers';

describe('Providers/Gmail', () => {
  const normalizedEmailAddress = 'johndoe@gmail.com';

  beforeEach(() => {});

  it('should not affect normalized email addresses', () => {
    expect(GmailProvider.getNormalizedAddress(normalizedEmailAddress)).toBe(normalizedEmailAddress);
  });

  describe('for every non-normalized email address', () => {
    describe('make it case insensitive', () => {
      it.each(['JohnDoe@gmail.com', 'Johndoe@gmail.com', 'johnDoe@gmail.com'])(
        `"%s" => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(GmailProvider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });

    describe('remove aliases', () => {
      it.each(['JohnDoe+school@gmail.com', 'Johndoe+important.emails@gmail.com'])(
        `%s => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(GmailProvider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });

    it('should map googlemail.com to gmail.com', () => {
      expect(GmailProvider.getNormalizedAddress('john.doe@googlemail.com')).toBe(normalizedEmailAddress);
    });

    it('should only rewrite the domain, not the local part', () => {
      expect(GmailProvider.getNormalizedAddress('googlemail.com@googlemail.com')).toBe('googlemailcom@gmail.com');
    });

    it('should drop everything after + even across newlines', () => {
      expect(GmailProvider.getNormalizedAddress('john+a\nb@gmail.com')).toBe('john@gmail.com');
    });

    it('should ignore surrounding spaces and domain case', () => {
      expect(GmailProvider.getNormalizedAddress(' John.Doe@GMAIL.com ')).toBe(normalizedEmailAddress);
    });

    it.each(['x@evil.com', 'x@yahoo.com', 'x@gmail.com.evil.com', 'x@notgmail.com', 'no-at-sign'])(
      'should throw instead of mapping %s to gmail.com',
      (emailAddress) => {
        expect(() => GmailProvider.getNormalizedAddress(emailAddress)).toThrow('is not a valid Gmail domain');
      },
    );

    describe('remove dots', () => {
      it.each(['john.doe@gmail.com', 'jo.hn.d.oe@gmail.com', 'j.o.h.n.d.o.e@gmail.com'])(
        `%s => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(GmailProvider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });
  });
});
