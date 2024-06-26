import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from 'vite-plugin-top-level-await'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import svgLoader from 'vite-svg-loader'
import path from 'path-browserify'

import { viteMockServe } from '@lincy/vite-plugin-mock'

// const pathSrc = path.resolve(__dirname, 'src')
const pathNodeModules = path.resolve(__dirname, 'node_modules')

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    build: {
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: true,
      sourcemap: false
    },
    resolve: {
      alias: {
        path: 'path-browserify',
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': `${pathNodeModules}/`
      }
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/styles/element/index.scss" as *;`,
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue(),
      // legacy({
      //   targets: ['defaults', 'not IE 11']
      // }),
      svgLoader({
        // defaultImport: '@/icons/svg/*.svg'
      }),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: i => `__tla_${i}`
      }),
      // viteMockServe({
      // mockPath: 'mock',
      // According to the project configuration. Can be configured in the .env file
      // enable: process.env.NODE_ENV === 'development',
      // logger: process.env.NODE_ENV === 'development',
      // watchFiles: true
      // }),
      ElementPlus({
        useSource: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
        dts: 'src/components.d.ts'
      })
    ]
  })
}

