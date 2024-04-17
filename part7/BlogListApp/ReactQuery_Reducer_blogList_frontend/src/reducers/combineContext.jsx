import React, { useReducer, useContext } from 'react'
import LoginContext, { loginReducer } from './LoginContext'
import NotificationContext, { notificationReducer } from './NotificationContext'

export const CombineProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )
  const [login, loginDispatch] = useReducer(loginReducer, null)
  // console.log(children)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <LoginContext.Provider value={[login, loginDispatch]}>
        {children}
      </LoginContext.Provider>
    </NotificationContext.Provider>
  )
}

const useNotification = () => useContext(NotificationContext)
const useLogin = () => {
  return useContext(LoginContext)
}

export { useNotification, useLogin }
