import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

function AnecdoteForm() {
    const dispatch = useDispatch()
    async function handleSubmit(e) {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        dispatch(createAnecdote(content))

        dispatch(setNotification(`you created, '${content}`, 5))

        // setTimeout(() => {
        //     dispatch(removeNotification(content))
        // }, 5000);
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}


export default AnecdoteForm