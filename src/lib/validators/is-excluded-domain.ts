import { getDomain, matchesDomain } from '../helpers/email-addresses';
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
    return matchesDomain(getDomain(addr), this.disposableEmailDomains);
  };

  isInExcludedDomain = (addr: string) => {
    return matchesDomain(getDomain(addr), this.excludedDomains);
  };

  isValid = (addr: string) => !matchesDomain(getDomain(addr), this.excludedDomainsMerged);
}

export interface IEmailAddressesFilter {
  disposableEmailDomains: string[];
  excludedDomains?: string[];
}
