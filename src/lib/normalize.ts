import { ProviderRouter } from './providers/router';

/**
 * Canonical form of an address, for deduplication.
 *
 * Gmail and Outlook addresses lose case, dots (Gmail only) and `+tag`;
 * other domains are only trimmed and lowercased.
 *
 * @example
 * normalize('John.Doe+news@Gmail.com'); // 'johndoe@gmail.com'
 */
export const normalize = (emailAddress: string): string => {
  const trimmed = emailAddress.trim();

  try {
    return ProviderRouter.route(trimmed).getNormalizedAddress(trimmed);
  } catch {
    return trimmed.toLowerCase();
  }
};
