import { useState } from 'react'

const Blog = ({ blog, user, increaseLike, deleteBlog }) => {
  const [infoVisible, setinfoVisble] = useState(false)

  const showWhenVisibile = { display: infoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAdditionalInfo = () => setinfoVisble(!infoVisible)

  return (
    <div style={blogStyle}>
      <span data-testid="blog-title">{blog.title}</span> <span data-testid="blog-author">{blog.author}</span> <button onClick={showAdditionalInfo}>{infoVisible ? 'Hide' : 'Show'}</button>
      <div style={showWhenVisibile}>
        <span data-testid="blog-url">{blog.url}</span><br />
        likes {blog.likes} <button onClick={() => increaseLike(blog)} data-testid="like-button">like</button><br />
        <span data-testid="user-name">{blog.user.name}</span><br />
        {
          blog.user.username === user.username
            ? <button onClick={() => deleteBlog(blog)}>Remove</button>
            : null
        }
      </div>
    </div>
  )
}

export default Blog