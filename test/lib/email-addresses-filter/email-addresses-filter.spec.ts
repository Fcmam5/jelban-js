import EmailAddressesFilter from '../../../src/lib/email-addresses-filter/email-addresses-filter';

describe('Email addresses filter', () => {
  describe('Excluded domains', () => {
    let filter: EmailAddressesFilter;

    beforeEach(() => {
      filter = new EmailAddressesFilter({
        disposableEmailDomains: [''],
        excludedDomains: ['wonderla.nd'],
      });
    });

    it('should return true if the provided email address not in the excluded domains list', () => {
      expect(filter.isValid('hmida@domain.dz')).toBeTruthy();
    });

    it('should return false if the provided email address in the excluded domains list', () => {
      expect(filter.isValid('alice@wonderla.nd')).toBeFalsy();
    });
  });

  describe('DisposableEmailAddress', () => {
    let filter: EmailAddressesFilter;

    beforeEach(() => {
      filter = new EmailAddressesFilter({
        disposableEmailDomains: ['mohmal.in'],
      });
    });

    it('should return false if the provided email address is temporary', () => {
      expect(filter.isValid('alice@mohmal.in')).toBeFalsy();
    });

    it('should return true if the provided email address is not in the list', () => {
      expect(filter.isValid('alice@wonderla.nd')).toBeTruthy();
    });
  });
});
