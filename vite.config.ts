import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({ prefix: "VITE",  mountedPath: "process.env" })
  ],
  css: {
    modules: {
      scopeBehaviour: 'local', // 'global' にすると全てのクラス名がグローバルに
      globalModulePaths: [/\.global\.css$/], // グローバル CSS として扱うパスの正規表現
      generateScopedName: '[name]__[local]___[hash:base64:5]', // クラス名の生成方法
    },
  },
})
