# jelBAN.js

A library for filtering fake, disposable and duplicated email addresses.

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

