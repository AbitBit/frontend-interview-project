module.exports = {
  transform: {
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
