/** Max length of an email address (RFC 5321 path limit, minus the angle brackets). */
export const MAX_ADDRESS_LENGTH = 254;

const MAX_DOMAIN_LENGTH = 253;

/** `true` if `value` is a string short enough to be an email address. */
export const isAddressLike = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= MAX_ADDRESS_LENGTH;

/**
 * Lowercased, trimmed domain part of an address; `''` if there is no `@`.
 *
 * @throws TypeError if `emailAddress` is not a string.
 */
export const getDomain = (emailAddress: string) => {
  if (typeof emailAddress !== 'string') {
    throw new TypeError('Email address must be a string');
  }

  const at = emailAddress.lastIndexOf('@');
  if (at === -1) return '';

  const domain = emailAddress.slice(at + 1);

  return domain.trim().toLowerCase();
};

/** Lowercased lookup set for {@link matchesDomain}. */
export const toDomainSet = (domains: string[]) => new Set(domains.map((d) => d.toLowerCase()));

/** `true` if `domain` is in `domains` or is a subdomain of an entry. Never matches domains over 253 chars. */
export const matchesDomain = (domain: string, domains: ReadonlySet<string>) => {
  if (domain.length > MAX_DOMAIN_LENGTH) return false;

  for (let d = domain; ; d = d.slice(d.indexOf('.') + 1)) {
    if (domains.has(d)) return true;
    if (!d.includes('.')) return false;
  }
};
