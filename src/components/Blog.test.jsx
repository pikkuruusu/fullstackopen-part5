import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('render only title and author', () => {
  const testBlog = {
    title: "Blog title",
    author: "Blog author",
    url: "blog url",
    likes: 4,
    user: {
      username: "test username",
      name: "test name"
    }
  }

  const testUser = {
    username: "test username",
    name: "test name"
  }

  render(<Blog blog={testBlog} user={testUser} />)

  const titleElement = screen.getByTestId('blog-title')
  expect(titleElement).toBeDefined()
  const authorElement = screen.getByTestId('blog-author')
  expect(authorElement).toBeDefined()
  const urlElement = screen.getByTestId('blog-url')
  expect(urlElement).not.toBeVisible()
  const userElement = screen.getByTestId('user-name')
  expect(userElement).not.toBeVisible()
})