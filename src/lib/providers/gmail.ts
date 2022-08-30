import { IProvider } from './provider.interface';

const GMAIL_DOT_COM = 'gmail.com';
const GOOGLEMAIL_DOT_COM = 'googlemail.com';
const AT_GMAIL_DOT_COM = `@${GMAIL_DOT_COM}`;

// eslint-disable-next-line import/prefer-default-export
export const GmailProvider: IProvider = {
  getNormalizedAddress(emailAddress: string): string {
    // TODO: Optimize me
    return emailAddress
      .toLowerCase()
      .replace(GOOGLEMAIL_DOT_COM, GMAIL_DOT_COM)
      .replace(/(\+[^@]+)/, '')
      .split(AT_GMAIL_DOT_COM)[0]
      .replace(/\./g, '')
      .concat(AT_GMAIL_DOT_COM);
  },
};
