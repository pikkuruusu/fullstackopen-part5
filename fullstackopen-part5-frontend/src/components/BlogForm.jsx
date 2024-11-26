import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (e) => {
    e.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            data-testid='title-input'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
            data-testid='author-input'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='author'
            onChange={({ target }) => setUrl(target.value)}
            data-testid='url-input'
          />
        </div>
        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default BlogForm