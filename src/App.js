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

  function compareLikes(a, b) {
    return b.likes - a.likes;
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareLikes) )
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

  const increaseLike = async (blogObject) => {
    const newLikesCount = blogObject.likes + 1

    const newBlogObject = {
      user: blogObject.user.id,
      likes: newLikesCount,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }

    try {
      await blogService.update(blogObject.id, newBlogObject)

      setBlogs((oldBlogList) => 
        oldBlogList.map((blog) => 
          blog.id === blogObject.id ? {...blog, likes: newLikesCount} : blog
        ).sort(compareLikes)
      )
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception.message)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title}?`)) {
      try {
        await blogService.deleteBlog(blogObject.id)
  
        setBlogs((oldBlogList) => 
          oldBlogList.filter((blog) => blog.id !== blogObject.id)
        )
      } catch (exception) {
        const exceptionMessage = 
          exception.response.data.error 
            ? exception.response.data.error
            : exception.message

        setErrorMessage(exceptionMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(exception.message)
      }
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
          <Togglable buttonLable='New blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <br />
        </div>
      }
      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} increaseLike={increaseLike} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App