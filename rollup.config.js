import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/package.cjs.js',
            format: 'cjs',
        },
    ],
    external: {
        ...Object.keys(pkg.dependencies || {}),
    },
    plugins: [
        typescript({tsconfigOverride: { compilerOptions : { module: "cjs" }}}),
        commonjs({extensions: ['.js', '.ts']}), // the ".ts" extension is required
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
        commonjs(),
    ],
};
