import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"


function Display() {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return anecdotes
        }
        const regex = new RegExp(filter)
        return anecdotes.filter(a => a.content.match(regex))
    })
    const dispatch = useDispatch()

    function handleVote(e) {
        const { name, id } = e.target
        dispatch(vote(id))
        // dispatch(setNotification({ name, sender: 'vote' }))

        // setTimeout(() => {
        //     dispatch(removeNotification())
        // }, 5000)

        dispatch(setNotification(`you voted '${name}'`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={handleVote} name={anecdote.content} id={anecdote.id}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Display