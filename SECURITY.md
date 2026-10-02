# Security Policy

## Supported Versions

The following versions of `jelban.js` are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability

We take the security of `jelban.js` seriously. If you believe you have found a security vulnerability, please follow the guidelines below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send vulnerability reports by email to: <au54vz9rk@mozmail.com>

Please include the following information in your report:

- Type of issue (e.g., disposable-domain filter bypass, normalization collision, denial of service via crafted input, injection via error messages, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

You should receive a response within **5 business days**. If for some reason you do not, please follow up via email to ensure we received your original message.

A wrong entry in the disposable domains list (a legitimate provider that is blocked, or a disposable service that is missing) is not a security vulnerability. Please open a regular issue or pull request for those.

### Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions.
2. Audit code to find any potential similar problems.
3. Prepare fixes for all supported versions.
4. Release new versions and notify users as quickly as possible.

We will coordinate a release date with the reporter to ensure the fix is available before the vulnerability is made public.

## Security Best Practices

When using `jelban.js` in your application:

- Keep the library updated to the latest version
- Validate the email syntax yourself before calling Jelban, ideally with the same parser you use to send mail (see [README, Issue #2](./README.md#issue-2))
- Do not use `normalize()` output as proof of identity or for authentication; see [README, Issue #1](./README.md#issue-1) and store the address the user typed as well
- Treat the disposable domains list as a best-effort filter, not a guarantee: new disposable services appear constantly
- Avoid logging `isValid()` errors verbatim if addresses are sensitive; the message includes up to 100 characters of the address (JSON-escaped)
- Keep the lockfile committed and review dependency changes in CI

### Known limitations

- The disposable domains list is static and incomplete. It only changes when a new version is released.
- Jelban does not validate email syntax by design, so `isValid('garbage')` returns `true`.
- `normalize()` collapses aliases (Gmail dots, `+tag`). It does not validate its input, so malformed addresses can normalize to the same value (e.g. `+a@gmail.com` and `.@gmail.com`).
- Inputs that are not strings, or are longer than 254 characters, are rejected by `isValid()`. `isDisposable()` throws a `TypeError` for non-strings.

## Acknowledgments

We thank the security researchers and community members who help keep `jelban.js` and its users safe by reporting vulnerabilities responsibly.
