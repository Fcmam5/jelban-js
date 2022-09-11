/* eslint-disable no-underscore-dangle */
import IsExcludedDomainValidator from './validators/is-excluded-domain';
import temporaryEmailDomains from './validators/temporary-email-domains';
import { ValidationPipe } from './validators/Validator.interfaces';

export class Jelban {
  private _validators: ValidationPipe[] = [];

  constructor(config?: JelbanConfig) {
    this.init({
      noGmailAliases: config?.noGmailAliases || true,
      noOutlookAliases: config?.noOutlookAliases || true,
      noDisposableEmailAddresses: config?.noDisposableEmailAddresses || true,
      excludeDomains: config?.excludeDomains || [],
      allowDomains: config?.allowDomains || [],
    });
  }

  private init(config: JelbanConfig) {
    if (config.noDisposableEmailAddresses) {
      this.registerValidator(
        new IsExcludedDomainValidator({
          disposableEmailDomains: temporaryEmailDomains,
          excludedDomains: config.excludeDomains,
        }),
      );
    }
  }

  registerValidator(validator: ValidationPipe) {
    this._validators.push(validator);
    return this;
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
  noGmailAliases: boolean;
  noOutlookAliases: boolean;
  noDisposableEmailAddresses: boolean;
  excludeDomains: string[];
  allowDomains: string[];
}
