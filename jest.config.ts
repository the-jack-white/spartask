/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 99.48,
      branches: 97.26,
      functions: 85.66,
      lines: 99.48,
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
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
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
