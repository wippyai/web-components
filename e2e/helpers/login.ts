import type { Page } from '@playwright/test'

export async function loginAsAdmin(page: Page) {
  const email = process.env.USERSPACE_USER_DEFAULT_ADMIN_EMAIL
  const password = process.env.USERSPACE_USER_DEFAULT_ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error(
      'Missing USERSPACE_USER_DEFAULT_ADMIN_EMAIL / _PASSWORD env vars. '
      + 'Copy .env.example to e2e/.env.',
    )
  }

  await page.goto('/')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /sign in/i }).click()
  await page.waitForURL(/\/home/, { timeout: 15_000 })
}

export async function navigateHostTo(page: Page, label: string) {
  // Wippy's facade renders the shell as a srcdoc iframe (no src attribute).
  const hostFrame = page.frameLocator('iframe').first()
  await hostFrame
    .getByRole('button', { name: label, exact: true })
    .or(hostFrame.getByRole('link', { name: label, exact: true }))
    .first()
    .click()
}
