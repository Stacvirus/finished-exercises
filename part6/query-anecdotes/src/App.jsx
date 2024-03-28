import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Display from './components/Display'

import NotificationContext, { notificationReducer } from './NotificationContext'
import { useReducer } from 'react'

const App = () => {

  const [notifications, notificationsDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notifications, notificationsDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
        <Display />

      </div>
    </NotificationContext.Provider>
  )
}

export default App
