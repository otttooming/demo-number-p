module.exports = {
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  preset: "jest-puppeteer",
  testRegex: "/integration/.*\\.(ts|tsx|js)$",
  transform: {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
};
