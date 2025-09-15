const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app test, goto root', () => {
  describe('login test', () => {
    beforeEach(async ({ page, request }) => {
      let user = null

      await request.post('/api/testing/reset')
      const response = await request.post('/api/users', {
        data: {
          name: 'John Do',
          username: 'John',
          password: '123'
        }
      })

      user = await response.json()
      await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
      await expect(page.getByText('log in to application')).toBeVisible()
    })

    test('login successfully', async ({ page }) => {
      await login(page, 'John', '123')
      await expect(page.getByText('John Do')).toBeVisible()
    })

    test('login fails', async ({ page }) => {
      await login(page, 'John', '12333')
      await expect(page.getByText('wrong credentials')).toBeVisible()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })

    describe('when user created', () => {
      beforeEach(async ({ page }) => {
        await login(page, 'John', '123')
      })

      test('can create blog', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'create new blog'})).toBeVisible()
      })

      test('created blog to be visible', async ({ page }) => {
        const title = 'This is a new era'
        const author = 'Adam Smith'
        const url = 'http://localhost:3001/xxxx'

        await createBlog(page, title, author, url)

        await expect(page.getByText(`${title} ${author}`)).toBeVisible()
      })

      describe('when user logged in', () => {
        beforeEach(async ({ page }) => {
          const title = 'This is a new era'
          const author = 'Adam Smith'
          const url = 'http://localhost:3001/xxxx'

          await createBlog(page, title, author, url)
          await page.getByRole('button', { name: 'view' }).click()
        })

        test('like button can be clicked', async ({ page }) => {
          await expect(page.getByText('http://localhost:3001/xxxx')).toBeVisible()
          await expect(page.getByText('likes 0')).toBeVisible()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByText('likes 1').waitFor()
          await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('blog can be deleted', async ({ page }) => {
          page.on('dialog', async dialog => {
            console.log('Dialog message:', dialog.message())
            await dialog.accept()
          })

          await expect(page.getByText('http://localhost:3001/xxxx')).toBeVisible()          
          await page.getByRole('button', { name: 'remove' }).click()
          await expect(page.getByText('http://localhost:3001/xxxx')).not.toBeVisible()
        })

        test('delete can be cancelled', async ({ page }) => {
          page.on('dialog', async dialog => {
            console.log('Dialog message:', dialog.message())
            await dialog.dismiss()
          })

          await expect(page.getByText('http://localhost:3001/xxxx')).toBeVisible()          
          await page.getByRole('button', { name: 'remove' }).click()
          await expect(page.getByText('http://localhost:3001/xxxx')).toBeVisible()
        })

        describe('only blog creator can see the delete button', () => {
          beforeEach(async ({ page, request }) => {
            let user

            //logout
            await page.getByRole('button', { name: 'log out'}).click()
            // create a new user
            const response = await request.post('/api/users', {
              data: {
                name: 'foo bar',
                username: 'foo',
                password: '123'
              }
            })

            user = await response.json()
            console.log(user)
            // login
            await login(page, 'foo', '123')
          })

          test('new user logged in, can see the pre-exist blog', async ({ page }) => {
            await expect(page.getByText('This is a new era Adam Smith')).toBeVisible()
          })

          test('one user cannot see the delete button for a blog created by another user', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
          })
        })

        describe('when already have one blog', () => {
          beforeEach(async ({ page }) => {
            //wait for the first blog open and click like
            await page.getByText('This is a new era Adam Smith').waitFor()
            // find the first blog and click like button once
            await page.getByRole('button', { name: 'like' }).click()

            // create another blog
            const title = 'This is the second era'
            const author = 'Sam Automan'
            const url = 'http://www.automan.com'
            await createBlog(page, title, author, url)
            await page.getByText('This is the second era Sam automan').waitFor()
          })

          test('most likes blog at the top', async ({ page }) => {
            // check that the first blog is on the top
            const blogs = page.getByTestId('blog-item')
            await expect(blogs).toHaveCount(2)

            await expect(blogs.nth(0)).toContainText('This is a new era Adam Smith')

            const secondBlog = blogs.nth(1)
            await secondBlog.getByRole('button', { name: 'view' }).click()

            const likeText = secondBlog.getByText(/likes \d/)
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(likeText).toContainText('likes 1');

            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('likes 2')).toBeVisible()

            await expect(blogs.nth(0)).toContainText('This is the second era Sam Automan')
          })
        })
      })
    })
  })
})