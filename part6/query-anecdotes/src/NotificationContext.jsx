import { createContext } from "react"

const NotificationContext = createContext()

export const notificationReducer = (state, action) => {

    switch (action.type) {
        case 'anecdote':
            return `anecdote '${action.content}'`
        case 'vote':
            return `voted for '${action.content}'`
        case 'remove':
            return ''
        case 'error':
            return action.content
        default:
            state
    }
}

export default NotificationContext