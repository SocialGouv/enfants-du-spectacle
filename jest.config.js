module.exports = {
  moduleNameMapper: {
    "^src/components(.*)$": "<rootDir>/src/components$1",
    "^src/lib(.*)$": "<rootDir>/src/lib$1",
    "^src/pages(.*)$": "<rootDir>/src/pages$1",
    "^src/styles(.*)$": "<rootDir>/src/styles$1",
    "^src/synchronize(.*)$": "<rootDir>/src/synchronize$1",
    "^src/__tests_lib(.*)$": "<rootDir>/src/__tests_lib$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/.next/",
    "<rootDir>/.k8s/",
  ],
  setupFilesAfterEnv: ["<rootDir>/jestInit.ts"]
}
