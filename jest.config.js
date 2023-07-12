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
    '^@app/reservations/(.*)$': '<rootDir>/apps/reservations/src/$1',
    '^@app/reservations$': '<rootDir>/apps/reservations/src',
    '^@shared/common/(.*)$': '<rootDir>/libs/common/src/$1',
    '^@shared/common$': '<rootDir>/libs/common/src',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
