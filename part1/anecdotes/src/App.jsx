import { useState } from 'react'

function Anecdotes() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  let max, indexVote;
  function next_anecdote() {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  function handleVote(index) {
    function addVote() {
      const newVote = { ...vote }
      newVote[index] += 1
      setVote(newVote)
      console.log(newVote[index] + "fuck is good")
    }
    findMax();
    return addVote
  }

  function findMax() {
    const values = Object.values(vote);
    indexVote = Math.max(...values);
    max = values.indexOf(indexVote)
  }

  const btnStyles = {
    padding: "7px"
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <span>has {vote[selected]} votes</span>
      <button onClick={handleVote(selected)}>Vote</button><button onClick={next_anecdote} style={btnStyles}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
      <p>has {indexVote} votes</p>
    </div>
  )
}

export default Anecdotes;