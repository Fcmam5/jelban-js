/* eslint-disable no-underscore-dangle */
import { ValidationPipe } from './Validator.interfaces';

export class Jelban {
  private _validators: ValidationPipe[] = [];
  // constructor(config: JelbanConfig) {}

  register(validator: ValidationPipe) {
    this._validators.push(validator);
  }

  isValid(emailAddress: string, throwOnError = true): boolean {
    const violatedRules = this._validators.filter((validator) => !validator.isValid(emailAddress));

    if (violatedRules.length === 0) {
      return true;
    }

    if (throwOnError) {
      const rules = violatedRules.map((validator) => `"${validator.ruleName}"`);
      throw new Error(`Invalid email address "${emailAddress}", rules: [${rules.join(', ')}]`);
    }

    return false;
  }

  get validators() {
    return this._validators;
  }
}

export interface JelbanConfig {
  noGmailAliases: true;
  noDisposableEmailAddresses: true;
  excludeDomains: [];
  allowDomains: [];
}
