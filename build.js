import esbuild from 'esbuild';

import glob from 'tiny-glob';

let entryPoints = await glob('./src/*.ts');
console.log(entryPoints);

const commonOptions = {
    entryPoints: entryPoints,
    splitting: true,
    // bundle: true,
    // minify: true,
    // outExtension: {'.js': '.mjs'},
};

// esbuild.build({
//     ...commonOptions,
//     format: 'esm',
//     outdir:'lib',
//     // outfile: 'lib/index.js',
// });
esbuild.buildSync({
    ...commonOptions,
    // platform: 'node',
    format: 'esm',
    outdir:'lib',
    // outfile: 'lib/index.cjs',
});
