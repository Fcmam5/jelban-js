import { OutlookProvider } from '../../../../src/lib/providers';

describe('Providers/Outlook', () => {
  const normalizedEmailAddress = 'john.doe@hotmail.com';

  beforeEach(() => {});

  it('should not affect normalized email addresses', () => {
    const rs = OutlookProvider.getNormalizedAddress(normalizedEmailAddress);
    expect(rs).toBe(normalizedEmailAddress);
  });

  describe('for every non-normalized email address', () => {
    describe('make it case insensitive', () => {
      it.each(['John.Doe@hotmail.com', 'John.doe@hotmail.com', 'john.Doe@hotmail.com'])(
        `"%s" => ${normalizedEmailAddress}`,
        (emailAddress: string) => {
          expect(OutlookProvider.getNormalizedAddress(emailAddress)).toBe(normalizedEmailAddress);
        },
      );
    });

    describe('remove aliases', () => {
      it.each([
        ['John.Doe+school@hotmail.com', 'john.doe@hotmail.com'],
        ['John.Doe+school@hotmail.fr', 'john.doe@hotmail.fr'],
        ['John.doe+important@live.com', 'john.doe@live.com'],
        ['John.doe+important@windowslive.com', 'john.doe@windowslive.com'],
        ['John.doe+important@outlook.com', 'john.doe@outlook.com'],
      ])('%s => %s', (emailAddress: string, expected: string) => {
        expect(OutlookProvider.getNormalizedAddress(emailAddress)).toBe(expected);
      });
    });

    it('should throw if the given address has not a valid outlook domain', () => {
      expect(() => OutlookProvider.getNormalizedAddress('alice@hotmail.dz')).toThrow(
        '"hotmail.dz" is not a valid Microsoft Outlook domain!',
      );
    });
  });
});
