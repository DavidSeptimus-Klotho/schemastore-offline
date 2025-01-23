import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        preserveModules: true
    },
    plugins: [
        json(),
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        commonjs({
            include: /node_modules\/brace-expansion/
        }),
        typescript({
            exclude: ["**/__tests__", "**/*.test.ts"],
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
            sourceMap: true
        })
    ],
};