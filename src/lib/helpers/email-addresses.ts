/** Lowercased domain part of an address, `''` if there is no `@`. */
export const getDomain = (emailAddress: string) => {
  const at = emailAddress.lastIndexOf('@');
  if (at === -1) return '';

  const domain = emailAddress.slice(at + 1);

  return domain.trim().toLowerCase();
};

/** Lowercased lookup set for {@link matchesDomain}. */
export const toDomainSet = (domains: string[]) => new Set(domains.map((d) => d.toLowerCase()));

/** `true` if `domain` is in `domains` or is a subdomain of an entry. */
export const matchesDomain = (domain: string, domains: ReadonlySet<string>) => {
  for (let d = domain; ; d = d.slice(d.indexOf('.') + 1)) {
    if (domains.has(d)) return true;
    if (!d.includes('.')) return false;
  }
};
