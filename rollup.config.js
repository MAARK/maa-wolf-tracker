/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  {
    input: ['src/index.js'],
    output: [
      {
        name: pkg.name,
        file: pkg.main,
        format: 'cjs',
        compact: true
      },
      { file: pkg.module, format: 'es', compact: true }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      json(),
      resolve({
        browser: true,
        main: true
      }),
      commonjs()
    ]
  }
];
