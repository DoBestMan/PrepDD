module.exports = {
  "roots": [
    "<rootDir>/app/javascript/src"
  ],
  "transform": {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": [
    "<rootDir>/app/javascript/src/setupEnzyme.ts"
  ]
}