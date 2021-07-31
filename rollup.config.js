import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

const serve = () => {
    let server;

    const toExit = () => {
        if (server) server.kill(0);
    };

    return {
        writeBundle() {
            if (server) return;
            server = require(`child_process`).spawn(`npm`, [`run`, `start`, `--`, `--dev`], {
                shell: true,
                stdio: [`ignore`, `inherit`, `inherit`],
            });
            process.on(`SIGTERM`, toExit);
            process.on(`exit`, toExit);
        }
    };
};

export default {
    input: `src/main.js`,
    output: {
        file: `public/build/bundle.js`,
        format: `iife`,
        name: `app`,
        sourcemap: false,
    },
    plugins: [
        svelte({
            compilerOptions: {
                dev: !production,
            }
        }),
        css({
            output: `bundle.css`,
        }),
        resolve({
            browser: true,
            dedupe: [`svelte`],
        }),
        commonjs(),
        !production && serve(),
        !production && livereload(`public`),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
