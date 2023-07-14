module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: '.',
  testRegex: 'src/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  "roots": [
    "<rootDir>/apps/",
    "<rootDir>/libs/"
  ],
  moduleNameMapper: {
    '^@app/auth/(.*)$': '<rootDir>/apps/auth/src/$1',
    '^@app/events/(.*)$': '<rootDir>/apps/events/src/$1',
    '^@app/payments/(.*)$': '<rootDir>/apps/payments/src/$1',
    '^@shared/common/(.*)$': '<rootDir>/libs/common/src/$1',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
