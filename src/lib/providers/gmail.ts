import { IProvider } from './provider.interface';

const GMAIL_DOT_COM = 'gmail.com';
const AT_GMAIL_DOT_COM = `@${GMAIL_DOT_COM}`;

export const GMAIL_DOMAINS = [GMAIL_DOT_COM, 'googlemail.com'];

/** Gmail: ignores case, dots and `+tag`; `googlemail.com` maps to `gmail.com`. */
export const GmailProvider: IProvider = {
  getNormalizedAddress(emailAddress: string): string {
    const at = emailAddress.lastIndexOf('@');
    const local = at === -1 ? emailAddress : emailAddress.slice(0, at);

    return local.toLowerCase().split('+')[0].split('.').join('').concat(AT_GMAIL_DOT_COM);
  },
};
