import IsAllowedDomainValidator from './validators/is-allowed-domain';
import IsExcludedDomainValidator from './validators/is-excluded-domain';
import temporaryEmailDomains from './validators/temporary-email-domains';
import { ValidationPipe } from './validators/Validator.interfaces';

/** Email address filter: blocks disposable domains and enforces allow/exclude lists. */
export class Jelban {
  private _validators: ValidationPipe[] = [];

  /** @param config - See {@link JelbanConfig}. */
  constructor(config: JelbanConfig = {}) {
    this.init({
      noDisposableEmailAddresses: config.noDisposableEmailAddresses ?? true,
      excludeDomains: config.excludeDomains || [],
      allowDomains: config.allowDomains || [],
    });
  }

  private init(config: JelbanConfig) {
    if (config.allowDomains && config.allowDomains.length) {
      this.registerValidator(new IsAllowedDomainValidator(config.allowDomains));
    }

    const excludedDomains = config.excludeDomains || [];

    if (config.noDisposableEmailAddresses || excludedDomains.length) {
      this.registerValidator(
        new IsExcludedDomainValidator({
          disposableEmailDomains: config.noDisposableEmailAddresses ? temporaryEmailDomains : [],
          excludedDomains,
        }),
      );
    }
  }

  /** Adds a custom validator. Returns `this` for chaining. */
  registerValidator(validator: ValidationPipe) {
    this._validators.push(validator);
    return this;
  }

  /**
   * Runs all validators against the address.
   *
   * @param throwOnError - Throw instead of returning `false` (default `true`).
   * @throws Error listing the violated rules.
   */
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

  /** Registered validators, in order. */
  get validators() {
    return this._validators;
  }
}

export interface JelbanConfig {
  /** Reject domains of known disposable email services. @defaultValue `true` */
  noDisposableEmailAddresses?: boolean;
  /** Extra domains to reject. @defaultValue `[]` */
  excludeDomains?: string[];
  /** Accept only these domains. Empty skips the check. @defaultValue `[]` */
  allowDomains?: string[];
}
