import { useState } from "react"

const Blog = ({ blog, increaseLike }) => {
  const [infoVisible, setinfoVisble] = useState(false)

  const showWhenVisibile = { display: infoVisible ? '' : 'none'}

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
      {blog.title} {blog.author} <button onClick={showAdditionalInfo}>{infoVisible ? 'Hide' : 'Show'}</button>
      <div style={showWhenVisibile}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => increaseLike(blog)}>like</button><br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog