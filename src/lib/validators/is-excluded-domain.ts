import { getDomain } from '../helpers/email-addresses';
import { ValidationPipe } from './Validator.interfaces';

export default class IsExcludedDomainValidator implements ValidationPipe {
  ruleName = 'IsExcludedDomainValidator';

  disposableEmailDomains: string[];

  excludedDomains: string[];

  private excludedDomainsMerged: string[];

  constructor(params: IEmailAddressesFilter) {
    this.disposableEmailDomains = params.disposableEmailDomains;
    this.excludedDomains = params.excludedDomains || [];
    this.excludedDomainsMerged = [...this.excludedDomains, ...this.disposableEmailDomains];
  }

  isDisposable = (addr: string) => {
    const domain = getDomain(addr);
    return this.disposableEmailDomains.includes(domain);
  };

  isInExcludedDomain = (addr: string) => {
    const domain = getDomain(addr);
    return this.excludedDomains.includes(domain);
  };

  isValid = (addr: string) => !this.excludedDomainsMerged.includes(getDomain(addr));
}

export interface IEmailAddressesFilter {
  disposableEmailDomains: string[];
  excludedDomains?: string[];
}
