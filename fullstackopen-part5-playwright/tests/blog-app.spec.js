const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.locator('[name="Username"]')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.locator('[name="Password"]')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
})