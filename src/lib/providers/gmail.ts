import { IProvider } from './provider.interface';

const GMAIL_DOT_COM = 'gmail.com';
const GOOGLEMAIL_DOT_COM = 'googlemail.com';
const AT_GMAIL_DOT_COM = `@${GMAIL_DOT_COM}`;

export default class GmailProvider implements IProvider {
  // eslint-disable-next-line class-methods-use-this
  getNormalizedAddress(emailAddress: string): string {
    return emailAddress
      .toLowerCase()
      .replace(GOOGLEMAIL_DOT_COM, GMAIL_DOT_COM)
      .replace(/(\+[^@]+)/, '')
      .split(AT_GMAIL_DOT_COM)[0]
      .replace(/\./g, '')
      .concat(AT_GMAIL_DOT_COM);
  }
}
