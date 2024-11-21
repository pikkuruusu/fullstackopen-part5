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
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='author'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default BlogForm