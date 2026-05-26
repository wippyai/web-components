import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the wippy-wc-extras E2E suite.
 *
 * Expects an external wippy app stack (e.g. app-template-raw) to be running
 * with replacements pointing to this repo's modules:
 *
 *   wippy.lock replacements:
 *     - from: wippy-wc-extras/mermaid
 *       to: ../web-components/src/mermaid
 *     ... etc.
 *
 *   src/app/deps/_index.yaml must declare wc-mermaid / wc-markdown / wc-chartjs
 *   ns.dependency entries with server: app:gateway.
 *
 * WIPPY_URL — wippy server base URL (default: http://localhost:8086)
 * USERSPACE_USER_DEFAULT_ADMIN_EMAIL / _PASSWORD — seeded admin credentials
 *   (copy .env.example to .env or set via environment).
 */
const WIPPY_URL = process.env.WIPPY_URL || 'http://localhost:8086'

export default defineConfig({
  testDir: '.',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 30_000,
  use: {
    baseURL: WIPPY_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
