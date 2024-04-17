// import { useNotificationMsg } from '../reducers/NotificationContext'
import { useNotification } from '../reducers/combineContext'

function Notification() {
  const [notification, notificationDispatch] = useNotification()
  // console.log(notification)

  if (!notification) {
    return
  }

  const { text, clr } = notification

  const notStyles = {
    color: `${clr}`,
    borderBottom: `2px solid ${clr}`,
  }

  return (
    <h3 style={notStyles} className="notification">
      {text}
    </h3>
  )
}

export default Notification
