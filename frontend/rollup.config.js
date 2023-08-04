import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript'; // Add this line
import sveltePreprocess from 'svelte-preprocess'; // Add this line

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}
export default {
  input: 'src/main.ts', // Change the entry point to .ts
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      // preprocess .svelte files
      preprocess: sveltePreprocess(), // Add this line
      compilerOptions: {
        dev: !production,
      },
    }),
    typescript(), // Add this line
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte'],
    }),
    commonjs(),
    !production && serve(),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};