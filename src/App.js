import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

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

  // Lets refactor the forms a bit
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification color="red" message={errorMessage} />
      <Notification color="green" message={notificationMessage} />

      {!user && 
        <div>
          <LoginForm 
            handleLogin={handleLogin}
            handleUsernameChange={setUsername}
            handlePasswordChange={setPassword}
            username={username}
            password={password}
          />
        </div>
      }
      {user &&
        <div>
          <div>
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <br />
          <Togglable buttonLable='New note' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <br />
        </div>
      }
      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App