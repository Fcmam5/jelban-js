export interface IProvider {
  //   isValid(emailAddress: string): boolean;
  getNormalizedAddress(emailAddress: string): string;
}
