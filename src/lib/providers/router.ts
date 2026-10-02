import { getDomain } from '../helpers/email-addresses';
import { GMAIL_DOMAINS, GmailProvider } from './gmail';
import { OUTLOOK_DOMAINS, OutlookProvider } from './outlook';
import { IProvider } from './provider.interface';

/** Picks the provider matching an address's domain. */
export const ProviderRouter: IProviderRouter = {
  route: (emailAddress: string) => {
    const domain = getDomain(emailAddress);

    if (GMAIL_DOMAINS.includes(domain)) {
      return GmailProvider;
    }

    if (OUTLOOK_DOMAINS.includes(domain)) {
      return OutlookProvider;
    }

    throw new Error(`No provider found for "${domain}" (for ${emailAddress})`);
  },
};

export interface IProviderRouter {
  /** @throws Error if no provider handles the domain. */
  route(emailAddress: string): IProvider;
}
