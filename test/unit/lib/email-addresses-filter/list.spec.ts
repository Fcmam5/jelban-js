import domains from '../../../../src/lib/email-addresses-filter/list';

describe('Disposable email domains list', () => {
  it('should not have duplicates', () => {
    expect(domains.length).toEqual(new Set(domains).size);
  });
});
