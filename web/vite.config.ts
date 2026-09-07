import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import relay from 'vite-plugin-relay'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    relay,
    devtools({
      eventBusConfig: {
        port: Number(process.env.VITE_DEVTOOLS_PORT ?? 42069),
      },
    }),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePattern: '^(__generated__|-)',
    }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})

export default config
