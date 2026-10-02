import { getDomain, matchesDomain, toDomainSet } from '../helpers/email-addresses';
import { ValidationPipe } from './Validator.interfaces';

export default class IsExcludedDomainValidator implements ValidationPipe {
  ruleName = 'IsExcludedDomainValidator';

  disposableEmailDomains: string[];

  excludedDomains: string[];

  private disposableSet: ReadonlySet<string>;

  private excludedSet: ReadonlySet<string>;

  constructor(params: IEmailAddressesFilter) {
    this.disposableEmailDomains = params.disposableEmailDomains;
    this.excludedDomains = params.excludedDomains || [];
    this.disposableSet = toDomainSet(this.disposableEmailDomains);
    this.excludedSet = toDomainSet(this.excludedDomains);
  }

  isDisposable = (addr: string) => matchesDomain(getDomain(addr), this.disposableSet);

  isInExcludedDomain = (addr: string) => matchesDomain(getDomain(addr), this.excludedSet);

  isValid = (addr: string) => !this.isDisposable(addr) && !this.isInExcludedDomain(addr);
}

export interface IEmailAddressesFilter {
  disposableEmailDomains: string[];
  excludedDomains?: string[];
}
