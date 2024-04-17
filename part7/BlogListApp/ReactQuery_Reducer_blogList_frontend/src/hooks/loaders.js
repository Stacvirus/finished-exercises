import axios from 'axios'
const userUrl = '/api/users/'
const blogUrl = '/api/blogs/'

export async function allUsers() {
  const res = await axios.get(userUrl)
  return res.data
}

export async function getUser({ params }) {
  const { id } = params
  const res = await axios.get(userUrl + id)
  return res.data
}

export async function getBlog({ params }) {
  const { id } = params
  console.l(id)
  const res = await axios.get(blogUrl + id)
  return res.data
}
