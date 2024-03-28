import { useContext } from "react"
import NotificationContext from "../NotificationContext"


const Notification = () => {
  let [notifications, notificationsDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notifications ? '' : 'none'
  }

  setTimeout(() => {
    notificationsDispatch({ type: 'remove', content: '' })
  }, 2000);



  // if (true) return null
  // console.log(notifications)

  return (
    <div style={style}>
      {notifications}
    </div>
  )
}

export default Notification
