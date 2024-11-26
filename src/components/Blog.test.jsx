import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

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

test('clicking button shows url and likes', async () => {
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

  const user = userEvent.setup()

  const button = screen.getByText('Show')
  await user.click(button)

  const urlElement = screen.getByTestId('blog-url')
  expect(urlElement).toBeVisible()
  const userElement = screen.getByTestId('user-name')
  expect(userElement).toBeVisible()
})

test('clicking like button triggers event', async () => {
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

  const mockHandler = vi.fn()
  
  render(<Blog blog={testBlog} user={testUser} increaseLike={mockHandler}/>)

  const user = userEvent.setup()

  const showButton = screen.getByText('Show')
  await user.click(showButton)

  const likeButton = screen.getByTestId('like-button')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})