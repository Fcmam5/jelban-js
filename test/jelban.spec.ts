import { Jelban } from '../src/lib/Jelban';
import { ValidationPipe } from '../src/lib/Validator.interfaces';

describe('Jelban', () => {
  describe('when created with default parameters', () => {
    let jelban: Jelban;

    beforeEach(() => {
      jelban = new Jelban();
    });

    it('should add new pipes to the validator', () => {
      const validatorPipeMock: ValidationPipe = { ruleName: 'is a valid something', isValid: jest.fn() };

      expect(jelban.validators).toHaveLength(0);
      jelban.register(validatorPipeMock);
      expect(jelban.validators).toHaveLength(1);
    });

    describe('isValid', () => {
      it('should return true if the email address is valid', () => {
        const mockIsValid = jest.fn();
        const validatorPipeMock1: ValidationPipe = { ruleName: 'is a valid something', isValid: mockIsValid };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'is a valid something else', isValid: mockIsValid };
        jelban.register(validatorPipeMock1);
        jelban.register(validatorPipeMock2);

        mockIsValid.mockReturnValue(true);

        expect(jelban.isValid('alice@wonderla.nd')).toBeTruthy();
      });

      it('should return false if the email address is invalid; and throwOnError is false', () => {
        const mockIsValid = jest.fn();
        const mockIsValid2 = jest.fn();
        const validatorPipeMock1: ValidationPipe = { ruleName: 'is a valid something', isValid: mockIsValid };
        const validatorPipeMock2: ValidationPipe = { ruleName: 'is a valid something else', isValid: mockIsValid2 };
        jelban.register(validatorPipeMock1);
        jelban.register(validatorPipeMock2);

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
        jelban.register(validatorPipeMock1);
        jelban.register(validatorPipeMock2);
        jelban.register(validatorPipeMock3);

        mockIsValid.mockReturnValue(true);
        mockIsValid2.mockReturnValue(false);
        mockIsValid3.mockReturnValue(false);

        expect(() => jelban.isValid('alice@wonderla.nd')).toThrowError(
          'Invalid email address "alice@wonderla.nd", rules: ["rule#2", "rule#3"]',
        );
      });
    });
  });
});
