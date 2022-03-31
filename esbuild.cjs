const glob = require('glob');
const {dtsPlugin} = require('esbuild-plugin-d.ts');

const files = glob.sync('./**/!(*.d).ts',
    {cwd: __dirname, ignore: ['./node_modules/**']});
console.log(files);

const common = {
  entryPoints: files,
  // splitting: true,
  // bundle: true,
  plugins: [dtsPlugin()],
};

require('esbuild').build({
  ...common,
  format: 'cjs',
  outdir: '__build',
});
require('esbuild').build({
  ...common,
  format: 'esm',
  outdir: '__build',
  outExtension: {'.js': '.mjs'},
});

// require('esbuild').build({
//   ...common,
//   platform: 'browser',
//   format: 'esm',
//   outdir: '__build',
//   outExtension: {'.js': '.browser.mjs'},
// });

// require('esbuild').build({
//   ...common,
//   platform: 'node',
//   format: 'cjs',
//   outdir: '__build',
//   outExtension: {'.js': '.node.cjs'},
// });
