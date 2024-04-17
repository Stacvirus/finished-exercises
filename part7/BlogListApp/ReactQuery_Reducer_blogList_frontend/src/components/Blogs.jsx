import { useRef } from 'react'

import AddBlog from './AddBlog'
import Togglable from './Togglable'

import useServer from '../hooks/useServer'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useNotification, useLogin } from '../reducers/combineContext'

import { styles } from '../Styles'

function Blogs() {
  const [response, blogsService] = useServer('/api/blogs')

  const [notification, notificationDispatch] = useNotification()
  const [login, loginDispatch] = useLogin()

  const blogFormRef = useRef()

  const handleSaveBlogs = (blogObject) => {
    newBlogMutation.mutate(blogObject)

    blogFormRef.current.handleVisibility()
  }

  function removeNofication() {
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification', payload: null })
    }, 3000)
  }

  function showAddBlogs() {
    return <AddBlog Save={handleSaveBlogs} />
  }

  // fetch processes with the react queryQuery library

  const userLoggedIn = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const loggedUser = window.localStorage.getItem('loggedInUser')
      if (loggedUser) {
        loginDispatch({
          type: 'local',
          payload: JSON.parse(loggedUser),
        })
        blogsService.setToken(login.token)

        return login
      }

      return null
    },
  })

  const newBlogMutation = useMutation({
    mutationFn: blogsService.addBlog,
    onSuccess: (newBlog) => {
      notificationDispatch({
        type: 'setNotification',
        payload: {
          text: `new blog created, ${newBlog.title}`,
          clr: 'green',
        },
      })
      removeNofication()
    },
    onError: (error) => {
      notificationDispatch({
        type: 'setNotification',
        payload: {
          text: error.response.data.error,
          clr: 'red',
        },
      })
      removeNofication()
    },
  })

  // const deleteBlogMutation = useMutation({
  //   mutationFn: blogsService.deleteBlog,
  // })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsService.getAllblogs,
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const blogs = response
  const { List, BlogS, Links } = styles

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable btnLable="create new" ref={blogFormRef}>
        {login && showAddBlogs()}
      </Togglable>
      <List className="screenBlogs">
        {blogs &&
          blogs.map((b) => (
            <BlogS to={b.id} key={b.id}>
              {b.title}, {b.author}
            </BlogS>
          ))}
      </List>
    </div>
  )
}

export default Blogs
