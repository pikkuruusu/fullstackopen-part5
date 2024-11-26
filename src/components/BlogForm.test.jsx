import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('form calls event handler with right details', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={mockHandler} />)

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const urlInput = screen.getByTestId('url-input')

  const submitButton = screen.getByText('add blog')

  await user.type(titleInput, 'A title for the blog')
  await user.type(authorInput, 'An author for the blog')
  await user.type(urlInput, 'An url for the blog')
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('A title for the blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('An author for the blog')
  expect(mockHandler.mock.calls[0][0].url).toBe('An url for the blog')
})