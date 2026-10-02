import { Jelban } from '../../src/lib/Jelban';
import IsAllowedDomainValidator from '../../src/lib/validators/is-allowed-domain';
import { ValidationPipe } from '../../src/lib/validators/Validator.interfaces';

describe('Jelban', () => {
  describe('when created with default parameters', () => {
    let jelban: Jelban;

    beforeEach(() => {
      jelban = new Jelban();
    });

    describe('registerValidator', () => {
      it('should add new pipes to the validator', () => {
        const validatorPipeMock: ValidationPipe = { ruleName: 'is a valid something', isValid: jest.fn() };

        expect(jelban.validators).toHaveLength(1);
        jelban.registerValidator(validatorPipeMock);
        expect(jelban.validators).toHaveLength(2);
      });

      it('should return the validator', () => {
        const validatorPipeMock: ValidationPipe = { ruleName: 'is a valid something', isValid: jest.fn() };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'is a valid something', isValid: jest.fn() };

        expect(jelban.validators).toHaveLength(1);
        const rs = jelban.registerValidator(validatorPipeMock).registerValidator(validatorPipeMock2);
        expect(rs).toEqual(jelban);
      });
    });

    describe('isValid', () => {
      it('should return true if the email address is valid', () => {
        const mockIsValid = jest.fn();
        const validatorPipeMock1: ValidationPipe = { ruleName: 'is a valid something', isValid: mockIsValid };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'is a valid something else', isValid: mockIsValid };
        jelban.registerValidator(validatorPipeMock1);
        jelban.registerValidator(validatorPipeMock2);

        mockIsValid.mockReturnValue(true);

        expect(jelban.isValid('alice@wonderla.nd')).toBeTruthy();
      });

      it('should return false if the email address is invalid; and throwOnError is false', () => {
        const mockIsValid = jest.fn();
        const mockIsValid2 = jest.fn();
        const validatorPipeMock1: ValidationPipe = { ruleName: 'is a valid something', isValid: mockIsValid };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'is a valid something else', isValid: mockIsValid2 };
        jelban.registerValidator(validatorPipeMock1);
        jelban.registerValidator(validatorPipeMock2);

        mockIsValid.mockReturnValue(true);
        mockIsValid2.mockReturnValue(false);

        expect(jelban.isValid('alice@wonderla.nd', false)).toBeFalsy();
      });

      it('should throw if the email address is invalid', () => {
        const mockIsValid = jest.fn();
        const mockIsValid2 = jest.fn();
        const mockIsValid3 = jest.fn();
        const validatorPipeMock1: ValidationPipe = { ruleName: 'rule#1', isValid: mockIsValid };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'rule#2', isValid: mockIsValid2 };
        const validatorPipeMock3: ValidationPipe = { ruleName: 'rule#3', isValid: mockIsValid3 };
        jelban.registerValidator(validatorPipeMock1);
        jelban.registerValidator(validatorPipeMock2);
        jelban.registerValidator(validatorPipeMock3);

        mockIsValid.mockReturnValue(true);
        mockIsValid2.mockReturnValue(false);
        mockIsValid3.mockReturnValue(false);

        expect(() => jelban.isValid('alice@wonderla.nd')).toThrowError(
          'Invalid email address "alice@wonderla.nd", rules: ["rule#2", "rule#3"]',
        );
      });
    });
  });

  describe('when created with allowedDomains', () => {
    const allowedDomains = ['mhaj.eb', 'faf.dz'];

    let jelban: Jelban;

    beforeEach(() => {
      jelban = new Jelban({ allowDomains: allowedDomains });
    });

    it('should register AllowedDomains', () => {
      expect(jelban.validators).toContainEqual(new IsAllowedDomainValidator(allowedDomains));
    });
  });

  describe('config toggles', () => {
    it('should not register the disposable validator when noDisposableEmailAddresses is false', () => {
      expect(new Jelban({ noDisposableEmailAddresses: false }).validators).toHaveLength(0);
    });

    it('should still apply excludeDomains when noDisposableEmailAddresses is false', () => {
      const jelban = new Jelban({ noDisposableEmailAddresses: false, excludeDomains: ['bad.com'] });

      expect(jelban.isValid('a@bad.com', false)).toBe(false);
      expect(jelban.isValid('a@mohmal.com', false)).toBe(true);
    });

    it('should block disposable domains by default', () => {
      expect(new Jelban().isValid('a@mohmal.com', false)).toBe(false);
    });
  });

  describe('hostile input', () => {
    const jelban = new Jelban();

    it.each([[undefined], [null], [123], [{}], [['a@mohmal.com']], [Symbol('x')]])(
      'should reject non-string %p without throwing when throwOnError is false',
      (input) => {
        expect(jelban.isValid(input as unknown as string, false)).toBe(false);
      },
    );

    it('should throw a regular Error for non-strings when throwOnError is true', () => {
      expect(() => jelban.isValid(['a@mohmal.com'] as unknown as string)).toThrow('Invalid email address');
    });

    it('should reject addresses longer than 254 characters quickly', () => {
      const start = Date.now();

      expect(jelban.isValid(`x@${'a.'.repeat(50_000)}com`, false)).toBe(false);
      expect(Date.now() - start).toBeLessThan(100);
    });

    it('should escape and truncate the address in the error message', () => {
      const address = `a\n<b>${'x'.repeat(500)}@mohmal.com`;

      try {
        jelban.isValid(address);
        throw new Error('should have thrown');
      } catch (e) {
        const { message } = e as Error;

        expect(message).not.toContain('\n');
        expect(message.length).toBeLessThan(250);
      }
    });
  });
});
