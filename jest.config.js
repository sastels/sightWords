module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/fixtures/"
  ],
  collectCoverageFrom: [
    "pages/*.js",
    "components/*.js",
    "components/stats/*.js",
    "selectors/*"
  ],
  coveragePathIgnorePatterns: ["pages/_app.js", "pages/_document.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironmentOptions: {
    beforeParse(window) {
      window.scrollTo = () => {};
    }
  }
};
