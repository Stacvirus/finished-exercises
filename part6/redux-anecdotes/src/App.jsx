import AnecdoteForm from './components/Form'
import Display from './components/DisplayAnecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initialAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Display />
      <AnecdoteForm />
    </div>
  )
}

export default App