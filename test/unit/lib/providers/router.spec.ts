import { ProviderRouter, GmailProvider, OutlookProvider } from '../../../../src/lib/providers';

describe('Route to provider', () => {
  describe('GmailProvider', () => {
    it.each([['alice@gmail.com'], ['alice@googlemail.com']])('should route(%s) to GmailProvider', (emailAddress) => {
      expect(ProviderRouter.route(emailAddress)).toBe(GmailProvider);
    });
  });

  describe('OutlookProvider', () => {
    it.each([
      'john.doe@hotmail.com',
      'john.doe@live.com',
      'john.doe@msn.com',
      'john.doe@outlook.com',
      'john.doe@hotmail.co.uk',
      'john.doe@hotmail.com.ar',
      'john.doe@hotmail.de',
      'john.doe@live.ca',
      'john.doe@windowslive.com',
    ])('should route(%s) to OutlookProvider', (emailAddress) => {
      expect(ProviderRouter.route(emailAddress)).toBe(OutlookProvider);
    });
  });

  it('should ignore domain case', () => {
    expect(ProviderRouter.route('alice@GMAIL.com')).toBe(GmailProvider);
  });

  it.each(['alice@gmail.evil.com', 'alice@hotmail.dz', 'alice@notgmail.com'])(
    'should not route lookalike domain (%s)',
    (emailAddress) => {
      expect(() => ProviderRouter.route(emailAddress)).toThrow('No provider found');
    },
  );

  it('should throw if the provider is not supported', () => {
    expect(() => ProviderRouter.route('alice@wonderla.nd')).toThrow(
      'No provider found for "wonderla.nd" (for alice@wonderla.nd)',
    );
  });
});
