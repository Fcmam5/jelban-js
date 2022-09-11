import domains from '../../../../src/lib/validators/temporary-email-domains';

describe('Disposable email domains list', () => {
  it('should not have duplicates', () => {
    expect(domains.length).toEqual(new Set(domains).size);
  });
});
