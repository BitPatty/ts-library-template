import pkg from './package.json';

import fs from 'fs';
import path from 'path';

import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import keysTransformer from 'ts-transformer-keys/transformer';

const transformers = [
  (service) => ({
    before: [keysTransformer(service.getProgram())],
    after: [],
  }),
];

const createPackageJson = {
  writeBundle: (opts) => {
    if (!['es', 'cjs'].includes(opts.format)) return;
    const dirName = path.join(__dirname, path.dirname(opts.file));
    const output = JSON.stringify({
      type: opts.format === 'es' ? 'module' : 'commonjs',
    });
    fs.writeFileSync(path.join(dirName, 'package.json'), output);
  },
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: true,
        compact: false,
      },
    ],
    plugins: [
      typescript({
        typescript: ttypescript,
        tsconfig: 'tsconfig.build.json',
        transformers,
        tsconfigOverride: {
          compilerOptions: {
            outDir: 'dist/cjs',
            declaration: false,
          },
        },
      }),
      createPackageJson,
    ],
    external: [],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
        strict: true,
        compact: false,
      },
    ],
    plugins: [
      typescript({
        typescript: ttypescript,
        tsconfig: 'tsconfig.build.json',
        transformers,
        tsconfigOverride: {
          compilerOptions: {
            outDir: 'dist/esm',
            declaration: false,
          },
        },
      }),
      createPackageJson,
    ],
    external: [],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.types,
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        typescript: ttypescript,
        tsconfig: 'tsconfig.build.json',
        transformers,
        tsconfigOverride: {
          compilerOptions: {
            outDir: 'dist/types',
            declaration: true,
            emitDeclarationOnly: true,
          },
        },
      }),
    ],
    external: [],
  },
];
