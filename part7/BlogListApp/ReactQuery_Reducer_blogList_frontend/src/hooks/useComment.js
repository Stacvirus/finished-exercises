import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useComment(infos) {
  const [value, setValue] = useState([])

  useEffect(() => {
    getComments()
  }, [])

  async function getComments() {
    const res = await axios.get(infos.url + infos.id)
    setValue(res.data.comments)
  }

  async function postComment(content) {
    const res = await axios.post(`${infos.url}${infos.id}`, content)
    setValue(value.concat(res.data))
  }

  const services = {
    getComments,
    postComment,
  }

  return [value, services]
}
