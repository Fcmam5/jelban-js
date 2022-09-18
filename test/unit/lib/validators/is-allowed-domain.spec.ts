import IsAllowedDomainValidator from '../../../../src/lib/validators/is-allowed-domain';

describe('Is Allowed domains validator', () => {
  const allowedDomains = ['mhaj.eb', 'faf.dz'];
  describe('isValid', () => {
    let validator: IsAllowedDomainValidator;

    beforeEach(() => {
      validator = new IsAllowedDomainValidator(allowedDomains);
    });

    it('should return true if the provided email address has an allowed domain', () => {
      expect(validator.isValid('hmida@faf.dz')).toBeTruthy();
    });

    it('should return false if the provided email address domain is not allowed', () => {
      expect(validator.isValid('hmida@kach-haja.dz')).toBeFalsy();
    });
  });

  it('should return the allowed domains', () => {
    const validator = new IsAllowedDomainValidator(allowedDomains);
    expect(validator.allowedDomains).toEqual(allowedDomains);
  });

  it('should set the allowed domains list to [] by default', () => {
    const validator = new IsAllowedDomainValidator();
    expect(validator.allowedDomains).toHaveLength(0);
  });
});
