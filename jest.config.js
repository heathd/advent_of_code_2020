module.exports = {
  "preset": 'ts-jest',
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testPathIgnorePatterns": ["/lib/", "/node_modules/"],
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "setupFilesAfterEnv": [
    "jest-extended"
  ],
}
