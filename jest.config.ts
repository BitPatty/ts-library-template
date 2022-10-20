import type { JestConfigWithTsJest } from 'ts-jest';

export default (): JestConfigWithTsJest => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['lcov', 'html', 'json'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    verbose: true,
    testMatch: ['**/*.test.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          compiler: 'ttypescript',
          tsconfig: 'tsconfig.json',
          useESM: true,
        },
      ],
    },
  };
};
