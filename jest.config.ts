/** @type {import('ts-jest').JestConfigWithTsJest} */

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 99.48,
      branches: 97.26,
      functions: 95.66,
      lines: 99.48,
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  preset: "ts-jest",
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    // "@testing-library/jest-dom/extend-expect",
    "<rootDir>/setupTests.js",
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
