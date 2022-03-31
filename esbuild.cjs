const glob = require('glob');
const {dtsPlugin} = require('esbuild-plugin-d.ts');

const files = glob.sync('./**/!(*.d).ts',
    {cwd: __dirname, ignore: ['./node_modules/**']});

files.forEach(async f => {
  console.log(`building ${f}`);
  console.log(await buildFile(f));
  console.log(`-- done --`);
});

function buildFile(f) {
  // console.log(f);
  const outdir = f.split('/index.ts')[0];
  const outfile = f.replace('.ts', '.js');
  // console.log(outfile);
  const common = {
    entryPoints: [f],
    plugins: [dtsPlugin()],
  };

  return Promise.all([
    // require('esbuild').build({
    //   ...common,
    //   format: 'esm',
    //   // bundle: true,
    //   // minify: true,
    //   platform: 'browser',
    //   outfile: f.replace('.ts', '.browser.mjs'),
    // }),
    require('esbuild').build({
      ...common,
      format: 'esm',
      // bundle: true,
      // minify: true,
      platform: 'node',
      outfile: f.replace('.ts', '.mjs'),
    }),
    require('esbuild').build({
      ...common,
      // minify: true,
      format: 'cjs',
      platform: 'node',
      outfile: f.replace('.ts', '.js'),
    }),
  ]);

}
