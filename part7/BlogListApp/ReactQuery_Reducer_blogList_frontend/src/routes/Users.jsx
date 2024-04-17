import { useRef } from 'react'
import LoginForm from '../components/Login'
import Togglable from '../components/Togglable'
import { Link, useLoaderData } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'

import { useLogin, useNotification } from '../reducers/combineContext'
import useUserLogin from '../hooks/useLogin'
import useServer from '../hooks/useServer'

import { styles } from '../Styles'
const { BlogS } = styles

function Users() {
  const [login, loginDispatch] = useLogin()
  const [credentials, loginService] = useUserLogin('/api/login')
  const [response, blogsService] = useServer('/api/blogs')

  const [notification, notificationDispatch] = useNotification()

  const users = useLoaderData()
  const loginFormRef = useRef()

  const handleLogin = (userInfos) => {
    loggedUserMutation.mutate(userInfos)
  }

  function removeNofication() {
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification', payload: null })
    }, 3000)
  }

  function showLogin() {
    return <LoginForm login={handleLogin} />
  }

  const loggedUserMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (userInfo) => {
      blogsService.setToken(userInfo.token)
      loginFormRef.current.handleVisibility()
    },
    onError: (error) => {
      console.log(error)
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

  const num = {
    padding: '5px',
    // borderRadius: '50%',
    background: 'gray',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }

  return (
    <div>
      <Togglable btnLable="log in" ref={loginFormRef}>
        {!login && showLogin()}
      </Togglable>

      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>
                <strong>blogs created</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <BlogS to={u.id.toString()}>{u.username}</BlogS>
                </td>
                <td style={num}>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
