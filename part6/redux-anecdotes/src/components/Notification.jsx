import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
    const dispatch = useDispatch()
    const msg = useSelector(({ notification }) => {
        // console.log(notification)
        return notification
    })
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: msg.text == undefined ? 'none' : ''
    }

    msg.delay && setTimeout(() => {
        dispatch(removeNotification())
    }, msg.delay)

    // const finaleMsg = msg.type == 'vote'
    //     ? `You voted, '${msg.content}'` : `you created, '${msg.content}'`
    return (
        <div style={style}>
            <p>{msg.text}</p>
        </div>
    )
}

export default Notification