import IsExcludedDomainValidator from '../../../../src/lib/validators/is-excluded-domain';

describe('Is Excluded domains validator', () => {
  describe('isValid', () => {
    describe('Excluded domains', () => {
      let validator: IsExcludedDomainValidator;

      beforeEach(() => {
        validator = new IsExcludedDomainValidator({
          disposableEmailDomains: [''],
          excludedDomains: ['wonderla.nd'],
        });
      });

      it('should return true if the provided email address not in the excluded domains list', () => {
        expect(validator.isValid('hmida@domain.dz')).toBeTruthy();
      });

      it('should return false if the provided email address in the excluded domains list', () => {
        expect(validator.isValid('alice@wonderla.nd')).toBeFalsy();
      });

      it('should return true if exclude domain list is empty', () => {
        const validator2 = new IsExcludedDomainValidator({ disposableEmailDomains: [''] });
        expect(validator2.isValid('hmida@domain.dz')).toBeTruthy();
      });
    });

    describe('DisposableEmailAddress', () => {
      let validator: IsExcludedDomainValidator;

      beforeEach(() => {
        validator = new IsExcludedDomainValidator({
          disposableEmailDomains: ['mohmal.in'],
        });
      });

      it('should return false if the provided email address is temporary', () => {
        expect(validator.isValid('alice@mohmal.in')).toBeFalsy();
      });

      it('should return true if the provided email address is not in the list', () => {
        expect(validator.isValid('alice@wonderla.nd')).toBeTruthy();
      });
    });
  });

  describe('isDisposable', () => {
    let validator: IsExcludedDomainValidator;

    beforeEach(() => {
      validator = new IsExcludedDomainValidator({
        disposableEmailDomains: ['mohmal.in'],
      });
    });

    it('should return false if the provided email address is temporary', () => {
      expect(validator.isDisposable('alice@mohmal.in')).toBeTruthy();
    });
  });

  describe('isInExcludedDomain', () => {
    let validator: IsExcludedDomainValidator;

    beforeEach(() => {
      validator = new IsExcludedDomainValidator({
        disposableEmailDomains: [],
        excludedDomains: ['wonderla.nd'],
      });
    });
    it('should return false if the provided email address is temporary', () => {
      expect(validator.isInExcludedDomain('alice@wonderla.nd')).toBeTruthy();
    });
  });
});
