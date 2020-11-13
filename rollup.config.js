import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import renameNodeModules from 'rollup-plugin-rename-node-modules';

export default {
  input: 'index.ts',
  output: [
    {
      dir: 'build',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  preserveModules: true,
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    generatePackageJson({
      outputFolder: 'build',
      baseContents: ({
        name,
        peerDependencies,
        dependencies,
        main,
        author,
        description,
        version,
      }) => ({
        name,
        version,
        author,
        description,
        main,
        peerDependencies,
        dependencies,
      }),
    }),
    renameNodeModules('ext'),
  ],
};
