export interface ValidationPipe {
  ruleName: string;
  isValid(emailAddress: string): boolean;
}
