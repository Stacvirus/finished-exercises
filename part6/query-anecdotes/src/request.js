import axios from "axios"

const url = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const res = await axios.get(url)
    return res.data
}

export const postData = async (Object) => {
    const res = await axios.post(url, Object)
    return res.data
}

export const updateData = async (object) => {
    const res = await axios.put(`${url}/${object.id}`, object)
    return res.data
}