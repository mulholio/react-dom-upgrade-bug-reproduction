const TEST_REGEX = '.*\\.test\\.[jt]sx?$';

module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/cssMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
