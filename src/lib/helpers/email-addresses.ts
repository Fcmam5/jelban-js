/** Lowercased domain part of an address, `''` if there is no `@`. */
export const getDomain = (emailAddress: string) => {
  const at = emailAddress.lastIndexOf('@');
  if (at === -1) return '';

  const domain = emailAddress.slice(at + 1);

  return domain.trim().toLowerCase();
};

/** `true` if `domain` is one of `domains` or a subdomain of one. */
export const matchesDomain = (domain: string, domains: string[]) =>
  domains.some((d) => domain === d || domain.endsWith(`.${d}`));
