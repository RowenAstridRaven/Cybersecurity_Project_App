module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // If you have styles or assets, map them to a stub
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ]
};
