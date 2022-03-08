module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)',
  ],
  transformIgnorePatterns: ['node_modules/(?!~/.*)'],
}
