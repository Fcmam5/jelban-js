export interface IProvider {
  getNormalizedAddress(emailAddress: string): string;
}
