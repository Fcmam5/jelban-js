module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverage: true,
  testMatch: [
    '**/test/unit/**/*.spec.ts',
  ],
};
