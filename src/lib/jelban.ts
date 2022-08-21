export default class Jelban {
  // constructor(config: JelbanConfig) {}
}

export interface JelbanConfig {
  noGmailAliases: true;
  noDisposableEmailAddresses: true;
  excludeDomains: [];
  allowDomains: [];
}
