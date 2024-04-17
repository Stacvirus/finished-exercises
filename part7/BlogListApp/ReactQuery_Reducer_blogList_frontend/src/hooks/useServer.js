import axios from 'axios'
import { useState } from 'react'

function sortValues(values) {
  return values.sort((a, b) => b.likes - a.likes)
}

function useServer(baseUrl) {
  const [value, setValue] = useState(null)
  let [token, setTokenValue] = useState(null)

  function setToken(userToken) {
    // console.log('in set token func')
    setTokenValue(`Bearer ${userToken}`)
  }

  const getAllblogs = async () => {
    const req = await axios.get(baseUrl)
    setValue(sortValues(req.data))
    return req.data
  }

  const getBlog = async (id) => {
    // console.log('in get blog func')
    const res = await axios.get(baseUrl + id)
    return res.data
  }

  const addBlog = async (blog) => {
    // console.log(token)
    const config = { headers: { Authorization: token } }
    const req = await axios.post(baseUrl, blog, config)
    setValue(sortValues(value.concat(req.data)))
    return req.data
  }

  const deleteBlog = async (id) => {
    // console.log(token)
    const config = { headers: { Authorization: token } }
    await axios.delete(`${baseUrl}/${id}`, config)
    setValue(value.filter((v) => v.id !== id))
  }

  const updateBlog = async (blog) => {
    const req = await axios.put(`${baseUrl}/${blog.id}`, blog)
    // console.log(value)
    if (value) {
      return setValue(
        sortValues(
          value.map((v) =>
            v.id === req.data.id ? { ...v, likes: req.data.likes } : v
          )
        )
      )
    }
    // console.log(req.data)
    setValue(req.data)
  }

  const services = {
    getAllblogs,
    setToken,
    deleteBlog,
    addBlog,
    updateBlog,
    getBlog,
  }

  return [value, services]
}

export default useServer
