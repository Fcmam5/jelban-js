import { getDomain } from '../helpers/email-addresses';
import { IProvider } from './provider.interface';

const GMAIL_DOT_COM = 'gmail.com';
const AT_GMAIL_DOT_COM = `@${GMAIL_DOT_COM}`;

export const GMAIL_DOMAINS = [GMAIL_DOT_COM, 'googlemail.com'];

/**
 * Gmail: ignores case, dots and `+tag`; `googlemail.com` maps to `gmail.com`.
 *
 * @throws Error if the domain is not `gmail.com` or `googlemail.com`.
 */
export const GmailProvider: IProvider = {
  getNormalizedAddress(emailAddress: string): string {
    const domain = getDomain(emailAddress);

    if (!GMAIL_DOMAINS.includes(domain)) {
      throw new Error(`"${domain}" is not a valid Gmail domain!`);
    }

    const local = emailAddress.slice(0, emailAddress.lastIndexOf('@'));

    return local.trim().toLowerCase().split('+')[0].split('.').join('').concat(AT_GMAIL_DOT_COM);
  },
};
