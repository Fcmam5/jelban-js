import GmailProvider from './gmail';
import OutlookProvider from './outlook';
import { IProvider } from './provider.interface';

const ProviderRouter: IProviderRouter = {
  route: (emailAddress: string) => {
    const domain = emailAddress.toLocaleLowerCase().substring(emailAddress.lastIndexOf('@') + 1);

    switch (domain.split('.')[0]) {
      case 'gmail':
      case 'googlemail':
        return GmailProvider;

      case 'hotmail':
      case 'live':
      case 'msn':
      case 'outlook':
      case 'windowslive':
        return OutlookProvider;
      default:
        throw new Error(`No provider found for "${domain}" (for ${emailAddress})`);
    }
  },
};

export interface IProviderRouter {
  route(emailAddress: string): IProvider;
}
export default ProviderRouter;
