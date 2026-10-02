# Privacy Policy

_Last updated: 2026-10-02_

`jelban.js` is an open-source JavaScript/TypeScript library that filters disposable email addresses and normalizes aliased ones (Gmail, Outlook). This document explains what data the project does, and does not, handle.

## TL;DR

- The library runs **entirely inside your application**.
- It does **not** collect, transmit, or store any personal data, telemetry, analytics, or usage statistics.
- It does **not** make outbound network requests at runtime.
- It has **no runtime dependencies**.

## Data the library processes

When you call `isValid()`, `isDisposable()` or `normalize()`, the email address you pass in is processed **locally and in memory only**, and compared against a list of domains bundled in the package. Nothing is uploaded anywhere by this library, and nothing is written to disk.

Email addresses are personal data in many jurisdictions. You, as the application developer, remain responsible for how you collect, store and use them (including anything you do with the normalized form).

One thing to be aware of: when `isValid()` throws, the error message contains the address you passed in, truncated to 100 characters. If your logging or error reporting should not contain email addresses, do not log those errors verbatim, or call `isValid(address, false)` to get a boolean instead.

## Telemetry

There is **no telemetry**. The package contains no analytics SDK, crash reporter, or "phone home" mechanism. You can verify this by inspecting the source code in this repository or the published package on npm.

## Third-party services

Installing or using `jelban.js` may indirectly involve third parties that have their own privacy policies, for example:

- **npm / GitHub** when you install or clone the package.
- **Badge and reporting services** (shields.io, Snyk, Codecov, the Stryker dashboard) whose images are loaded when you view the README on GitHub or npm. The project's CI also sends test coverage and mutation-testing reports about this repository's code to some of them. No data about users of the library is involved.

These services are outside the control of this project.

## Data we collect through GitHub

If you interact with this repository on GitHub (issues, pull requests, discussions, security advisories), GitHub will process the information you provide according to [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). The maintainers only see what GitHub exposes to repository collaborators.

## Security reports

If you contact the maintainer privately to report a security issue (see [`SECURITY.md`](./SECURITY.md)), your email address and the contents of your report will be used solely to triage and fix the issue. Reports are not shared publicly without your consent, beyond any eventual GitHub Security Advisory acknowledgements.

## Children's privacy

The project is a developer tool and is not directed at children under 13. No personal data is knowingly collected from anyone.

## Changes to this policy

This policy may be updated as the project evolves. Material changes will be reflected in the commit history of this file and the "Last updated" date above.

## Contact

For privacy-related questions, contact: **au54vz9rk@mozmail.com**.
