const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'test-user',
                name: 'Staffan Småros',
                password: 'hemligt'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'test-user', 'hemligt')

            await expect(page.getByText('Staffan Småros is logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'test-user', 'wrong')

            await expect(page.locator('.notification')).toHaveText('Wrong credentials')
        })
    })
})