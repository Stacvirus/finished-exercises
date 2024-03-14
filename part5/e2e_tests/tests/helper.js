async function loginWith(page, name, password) {
    await page.getByRole('textbox').first().fill(name)
    await page.getByRole('textbox').last().fill(password)

    await page.getByRole('button', { name: 'login' }).click()
}

async function createBlog(page, title, author, url, likes) {
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByTestId('likes').fill(likes)
    await page.getByRole('button', { name: 'Save' }).click()
    // page.locator('.notification').waitFor()
}

module.exports = { loginWith, createBlog }