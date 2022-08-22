export default class EmailAddressesFilter {
  disposableEmailDomains: string[];

  excludedDomains: string[];

  constructor(params: IEmailAddressesFilter) {
    this.disposableEmailDomains = params.disposableEmailDomains;
    this.excludedDomains = params.excludedDomains || [];
  }

  isDisposable = (addr: string) => {
    const domain = this.getDomain(addr);
    return this.disposableEmailDomains.includes(domain);
  };

  isInExcludedDomain = (addr: string) => {
    const domain = this.getDomain(addr);
    return this.excludedDomains.includes(domain);
  };

  isValid = (addr: string) => !(this.isInExcludedDomain(addr) || this.isDisposable(addr));

  // eslint-disable-next-line class-methods-use-this
  private getDomain(emailAddress: string) {
    return emailAddress.split('@')[1];
  }
}

export interface IEmailAddressesFilter {
  disposableEmailDomains: string[];
  excludedDomains?: string[];
}
