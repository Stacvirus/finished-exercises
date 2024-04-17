import axios from 'axios'
// const baseUrl = 'http://localhost:3000/api/blogs'
// const loginUrl = 'http://localhost:3000/api/login'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null

//user request functions

export function setToken(userToken) {
  token = `Bearer ${userToken}`
}

export const userLogin = async (userCredentials) => {
  const req = await axios.post(loginUrl, userCredentials)
  return req.data
}

//blogs request functions

export const getAllblogs = async () => {
  const req = await axios.get(baseUrl)
  return req.data.sort((a, b) => b.likes - a.likes)
}

export const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const req = await axios.delete(`${baseUrl}/${id}`, config)
  return id
}

export const addBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const req = await axios.post(baseUrl, blog, config)
  return req.data
}

export const updateBlog = async (blog) => {
  const req = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return req.data
}

// export default {
//   getAllblogs,
//   deleteBlog,
//   addBlog,
//   userLogin,
//   setToken,
//   updateBlog,
// }
