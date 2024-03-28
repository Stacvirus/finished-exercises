import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const slice = createSlice({
  name: 'ancedotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setVotes(state, action) {
      // console.log(JSON.parse(JSON.stringify(state)))

      const id = action.payload.id
      const target = action.payload
      const res = state.map(s => s.id !== id ? s : target)
      return res.sort((a, b) => b.votes - a.votes)
    }
  }
})


export const { appendAnecdote, setAnecdotes, setVotes } = slice.actions

export function initialAnecdotes() {
  return async dispatch => {
    const ancedotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(ancedotes))
  }
}

export function createAnecdote(content) {
  return async disptch => {
    const newAnecdote = await anecdoteService.postAnecdote(content)
    disptch(appendAnecdote(newAnecdote))
  }
}

export function vote(id) {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const target = anecdotes.find(s => s.id === id)
    const result = { ...target, votes: target.votes + 1 }
    const votedAnecdotes = await anecdoteService.updateAnecdote(result)

    dispatch(setVotes(votedAnecdotes))
  }
}

export default slice.reducer