import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')

    if(loggedBlogUserJSON) {
      const user = JSON.parse(loggedBlogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login(
        {username, password}
      )

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setNotificationMessage(`${user.name} was successfully logged in.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    setNotificationMessage(`${user.name} was logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification color="red" message={errorMessage} />
        <Notification color="green" message={notificationMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='author'
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='author'
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>add blog</button>
        </form>
      </div>
    )
  }

  // Lets refactor the forms a bit
  const addBlog = async (e) => {
    e.preventDefault()

    try {
      const returnedBlog = await blogService.create(
        { title, author, url}
      )

      setBlogs(blogs.concat(returnedBlog))

      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
        setErrorMessage(exception.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(exception.message)
    }
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification color="red" message={errorMessage} />
      <Notification color="green" message={notificationMessage} />
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App