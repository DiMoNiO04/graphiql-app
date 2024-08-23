import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    css: false,
    coverage: {
      enabled: true,
      all: true,
      provider: 'v8',
      reporter: ['text'],
      include: ['**/*.{ts,tsx}'],
      // thresholds: {
      //   statements: 80,
      // },
    },
    silent: true,
    watch: false,
  },
});
