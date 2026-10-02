import { getDomain, matchesDomain, toDomainSet } from './helpers/email-addresses';
import temporaryEmailDomains from './validators/temporary-email-domains';

const disposableDomains = toDomainSet(temporaryEmailDomains);

/**
 * `true` if the address uses a known disposable email domain (subdomains included).
 *
 * @example
 * isDisposable('kavi@boxomail.live'); // true
 */
export const isDisposable = (emailAddress: string): boolean =>
  matchesDomain(getDomain(emailAddress), disposableDomains);
