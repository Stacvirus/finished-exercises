import axios from "axios"
const url = 'http://localhost:3006/anecdotes'

async function getAll() {
    const res = await axios.get(url)
    return res.data
}

async function postAnecdote(content) {
    const object = { content, important: false, votes: 0 }
    const res = await axios.post(url, object)
    return res.data
}

async function updateAnecdote(object) {
    const res = await axios.put(`${url}/${object.id}`, object)
    return res.data
}

export default { getAll, postAnecdote, updateAnecdote }