import type { FrameLocator, Page } from '@playwright/test'

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

/**
 * Opens a page of the running shell and returns its frame. The Web Host (1.0.68 and later) renders
 * the shell in the top document and each view.page in an iframe named `wippy:page:<entry id>`.
 * Navigation happens inside the shell, because a deep link can race the shell's start.
 */
export async function openHostPage(page: Page, path: string): Promise<FrameLocator> {
  await page.evaluate((p) => {
    history.pushState({}, '', p)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, path)
  const frame = page.locator('iframe[name^="wippy:page:"]').first()
  await frame.waitFor({ state: 'attached', timeout: 15_000 })
  return frame.contentFrame()
}
