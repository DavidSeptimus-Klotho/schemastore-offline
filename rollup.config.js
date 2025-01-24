import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json";

/** @typedef {import('rollup').RollupOptions} */
export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        preserveModules: true
    },
    external: ['micromatch'],
    plugins: [
        json(),
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        typescript({
            exclude: ["**/__tests__", "**/*.test.ts"],
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
            sourceMap: true
        })
    ],
} ;