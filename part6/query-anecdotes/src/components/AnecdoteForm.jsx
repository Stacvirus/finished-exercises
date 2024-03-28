import { postData } from "../request"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notifications, notificationsDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdote = useMutation({
    mutationFn: postData,
    onSuccess: (newData) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newData))
    },
    onError: (error) => {
      notificationsDispatch({ type: 'error', content: error.response.data.error })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdote.mutate({ content, votes: 0 })
    notificationsDispatch({ type: 'anecdote', content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
