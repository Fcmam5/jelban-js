/** Email provider with its own alias rules. */
export interface IProvider {
  /** Canonical address for the provider (lowercase, aliases removed). */
  getNormalizedAddress(emailAddress: string): string;
}
