import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: ['ramda'],
    plugins: [
      esbuild()
    ]
  }
]