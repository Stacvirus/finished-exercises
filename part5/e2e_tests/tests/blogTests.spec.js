const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('bloglist app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('api/testing/reset')
        await request.post('api/users', {
            data: {
                name: 'root',
                username: 'virus',
                password: 'password'
            }
        })

        await page.goto('')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    })

    describe('Login', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'log in' }).click()
        })

        test('succeeds with correct credentials', async ({ page }) => {
            await helper.loginWith(page, 'virus', 'password')
            await page.locator('.userMsg').waitFor()

            await expect(page.getByText('virus logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await helper.loginWith(page, 'root', '123548')
            // page.locator('.notification').waitFor()

            await expect(page.getByText('root logged in')).not.toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'log in' }).click()

            await helper.loginWith(page, 'virus', 'password')
            await page.locator('.userMsg').waitFor()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blogs' }).click()

            await helper.createBlog(page, 'a blog comming from e2e testing', 'e2e', 'playwright@gmail.com', '12')

            await expect(page.getByText('a blog comming from e2e testing, e2e')).toBeVisible()
        })

        test('block can be edited', async ({ page }) => {
            await page.getByRole('button', { name: 'new blogs' }).click()

            await helper.createBlog(page, 'a blog comming from e2e testing', 'e2e', 'playwright@gmail.com', '12')

            const likesElement = page.locator('li').filter({ hasText: 'a blog comming from e2e testing, e2e' })
            await likesElement.getByRole('button', { name: 'view' }).last().click()

            const blog = page.locator('.aBlog').last()
            await blog.getByRole('button', { name: 'like' }).click()

            await expect(blog.getByTestId('likesList')).toContainText(`13 like`)
        })

        test('owner can delete his blog', async ({ page }) => {
            const ran = Math.floor(Math.random() * 100)
            await page.getByRole('button', { name: 'new blogs' }).click()
            await helper.createBlog(page, `this is for the delete test ${ran}`, 'e2e', 'test.com', '1')

            page.getByText(`this is for the delete test ${ran}, e2e`).waitFor()

            await page.getByRole('button', { name: 'view' }).click()

            page.on('dialog', dialog => dialog.accept())
            await page.locator('.aBlog').getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText(`this is for the delete test ${ran}, e2e`)).not.toBeVisible()
        })


    })

    describe('when user logged out', () => {
        beforeEach(async ({ page, request }) => {
            await request.post('api/users', {
                data: {
                    name: 'test',
                    username: 'virusTest',
                    password: 'password'
                }
            })

            await page.getByRole('button', { name: 'log in' }).click()
            await helper.loginWith(page, 'virus', 'password')
            await page.locator('.userMsg').waitFor()

            await page.getByRole('button', { name: 'new blogs' }).click()
            await helper.createBlog(page, 'first blog', 'e2e', 'test.com', '1', true)
            await helper.createBlog(page, 'second blog', 'e2e', 'test/rest.com', '2', true)
        })

        test('another user cannot delete a blog', async ({ page }) => {

            await page.getByRole('button', { name: 'logout' }).click()
            page.reload()

            await page.getByRole('button', { name: 'log in' }).click()
            await helper.loginWith(page, 'virusTest', 'password')
            await page.locator('.userMsg').waitFor()

            const blog = page.locator('.aBlog').first()
            await blog.getByRole('button', { name: 'view' }).click()
            await expect(blog.getByText('remove')).not.toBeVisible()

        })

        test('blogs arrange according to the likes value', async ({ page }) => {
            const likeBlogs = page.getByTestId('likesList').all()

            const likes = (await likeBlogs).map(async (blog) => {
                return Number((await blog.innerText()).split(' ')[0])
            })

            const len = likes.length
            let result = false

            for (let i = 0; i < len - 1; i++) {
                if (likes[i] < likes[i++]) result = true
            }

            expect(result).toBe(false)
        })
    })


})