import { getDomain } from '../helpers/email-addresses';
import { ValidationPipe } from './Validator.interfaces';

export default class IsAllowedDomainValidator implements ValidationPipe {
  ruleName = 'IsAllowedDomainValidator';

  constructor(private readonly _allowedDomains: string[] = []) {}

  isValid(emailAddress: string): boolean {
    return this._allowedDomains.includes(getDomain(emailAddress));
  }

  get allowedDomains() {
    return this._allowedDomains;
  }
}
