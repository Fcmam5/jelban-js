import GmailProvider from '../../../src/lib/providers/gmail';

describe('Providers/Gmail', () => {
  let provider: GmailProvider;
  const normalizedEmailAddress = 'johndoe@gmail.com';

  beforeEach(() => {
    provider = new GmailProvider();
  });

  it('should not affect normalized email addresses', () => {
    expect(provider.getNormalizedAddress(normalizedEmailAddress)).toBe(normalizedEmailAddress);
  });

  describe('for every non-normalized email address', () => {
    describe('make it case insensitive', () => {
      it.each(['JohnDoe@gmail.com', 'Johndoe@gmail.com', 'johnDoe@gmail.com'])(
        `"%s" => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(provider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });

    describe('remove aliases', () => {
      it.each(['JohnDoe+school@gmail.com', 'Johndoe+important.emails@gmail.com'])(
        `%s => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(provider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });

    describe('remove dots', () => {
      it.each(['john.doe@gmail.com', 'jo.hn.d.oe@gmail.com', 'j.o.h.n.d.o.e@gmail.com'])(
        `%s => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(provider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });
  });
});
