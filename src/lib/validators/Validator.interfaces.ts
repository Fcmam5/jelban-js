/** A single validation rule. */
export interface ValidationPipe {
  /** Name reported in the error when the rule fails. */
  ruleName: string;
  /** `true` if the address passes the rule. */
  isValid(emailAddress: string): boolean;
}
