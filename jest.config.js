module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverage: true,
  testMatch: ['**/test/unit/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.stryker-tmp/'],
  modulePathIgnorePatterns: ['<rootDir>/.stryker-tmp/'],
};
