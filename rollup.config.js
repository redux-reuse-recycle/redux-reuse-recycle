import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    external: ['react', 'web3'],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
        commonjs(),
    ],
};
