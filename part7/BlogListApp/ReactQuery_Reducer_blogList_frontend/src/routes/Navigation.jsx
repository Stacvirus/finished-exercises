import { useLogin } from '../reducers/combineContext'
import { NavLink, Outlet } from 'react-router-dom'
import Notification from '../components/Notifications'
import { styles } from '../Styles'

const { Nav, NavLinks, LinkS, Btn } = styles

export default function Navigation() {
  const [login, loginDispatch] = useLogin()

  function handleLogout() {
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      <Notification />
      <Nav>
        <NavLinks>
          <LinkS to="/">home</LinkS>
          <LinkS to="/users">users</LinkS>
        </NavLinks>
        <span>
          {login ? (
            <span>{login.username} logged in </span>
          ) : (
            <span>no user logged in</span>
          )}
          {login && <Btn onClick={handleLogout}>logout</Btn>}
        </span>
      </Nav>
      <h1>blog app</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
