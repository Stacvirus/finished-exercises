import { createContext } from 'react'
const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'removeNotification':
      return action.payload
    default:
      return state
  }
}

export default NotificationContext
