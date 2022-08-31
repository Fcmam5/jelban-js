# jelBAN.js

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FFcmam5%2Fjelban-js%2Fdevelop)](https://dashboard.stryker-mutator.io/reports/github.com/Fcmam5/jelban-js/develop) ![Known Vulnerabilities](https://snyk.io/test/github/Fcmam5/jelban-js/badge.svg) [![codecov](https://codecov.io/gh/Fcmam5/jelban-js/branch/develop/graph/badge.svg?token=L0LQ6O6Q2M)](https://codecov.io/gh/Fcmam5/jelban-js)

A library for filtering fake, disposable and duplicated email addresses.

## Features

- Filters and checks for disposable email addresses from temporary email services (like 10minutemail and Mohmal).
- Filters and checks for aliases that lead to the same email box from providers like [Gmail](#gmail).
- Filters for emails within an allowed domain list, or that are not in an excluded domain list.

## Supported Providers

### Gmail

Jelban's Gmail provider normalizes Gmail addresses to lowercase, non dotted and non aliased `@gmail.com` email addresses, since:

0. Gmail addresses are not case sensitive, `John.Doe@gmail.com` is equivalent to `john.doe@gmail.com`.

1. Gmail offers an [aliases feature](https://support.google.com/mail/answer/22370?hl=en#zippy=%2Cfilter-using-your-gmail-alias) where you can create multiple aliases for your address, example:

    > For example, messages sent to the following aliases will all go to janedoe@gmail.com:
    >
    > janedoe<strong>+school</strong>@gmail.com
    > janedoe<strong>+notes</strong>@gmail.com
    > janedoe<strong>+important.emails</strong>@gmail.com

2. Also, `@gmail.com` addresses, can be reached by using `@googlemail.com`, source [http://techcrunch.com/2010/05/03/gmail-uk/](http://techcrunch.com/2010/05/03/gmail-uk/). So `janedoe@gmail.com` is exactly equivalent to `janedoe@googlemail.com`.

3. Dots don't matter in Gmail addressees ([source](https://support.google.com/mail/answer/7436150?hl=en)), so `john.smith@gmail.com`, and `jo.hn.sm.ith@gmail.com`, and `j.o.h.n.s.m.i.t.h@gmail.com` and `johnnsmith@gmail.com` are all similar.

## Outlook/Hotmail

Similarly to the previous provider, Jelban's Outlook provider normalizers Outlook (aka. Hotmail) email addresses as it has also the option to create aliases ([src](https://www.cnet.com/tech/tech-industry/hotmail-launches-accounts-you-can-throw-away/)), example:

> Emails to *jane.doe<strong>+school</strong>@hotmail.fr*  and *jane.doe<strong>+work</strong>@hotmail.fr* will land at `jane.doe@hotmail.fr`'s mailbox

## Security and privacy concerns

### Issue #1

If you rely on the email normalization feature of this library you might be making account enumeration and brute force attacks easier. As attackers will have to guess for only a small subset of strings that does not have dots, upper/lowercase characters or aliases.

Also, users may choose to use the aliases when registering to your applications, and that a choice that must be respected as they may route that kind of emails to certain folders in their mailboxes.

#### Possible solution

Store email addresses in both formats, the user input and your normalized format, and when checking if an address is used you can rely on the normalized one, this may cause another issue if a user wants to change from their address `johnsmith@gmail.com` to `john.smith@gmail.com` in their profile settings, then you know best what to do :)

## Development

To run the project locally

```bash
# Use recommended Node version
nvm install
nvm use

# install dependencies
npm i

# run tests
npm test

# run mutation tests
npm run mutate
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details