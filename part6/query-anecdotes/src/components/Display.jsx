import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateData } from '../request'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'




const Display = () => {
    const [notifications, notificationsDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()


    const votedAnecdote = useMutation({
        mutationFn: updateData,
        onSuccess: (updatedData) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const res = anecdotes.map(a => {
                if (a.id === updatedData.id) {
                    return updatedData
                }
                return a
            })
            queryClient.setQueryData(['anecdotes'], res)
        },
    })

    const handleVote = async (anecdote) => {
        votedAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        notificationsDispatch({ type: 'vote', content: anecdote.content })
    }

    const res = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    if (res.isLoading) {
        return <div>loading data...</div>
    }

    if (res.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    // console.log(JSON.parse(JSON.stringify(res)))

    const anecdotes = res.data

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Display