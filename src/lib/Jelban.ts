/* eslint-disable no-underscore-dangle */
import ProviderRouter, { IProviderRouter } from './providers/router';
import { ValidationPipe } from './validators/Validator.interfaces';

export class Jelban {
  private _validators: ValidationPipe[] = [];

  providerRouter: IProviderRouter = ProviderRouter;

  // constructor(config: JelbanConfig) {}

  registerValidator(validator: ValidationPipe) {
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

  getNormalizedAddress(emailAddress: string): string {
    return this.providerRouter.route(emailAddress).getNormalizedAddress(emailAddress);
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
