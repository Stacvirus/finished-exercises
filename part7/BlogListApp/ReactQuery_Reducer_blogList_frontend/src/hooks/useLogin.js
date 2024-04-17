import axios from 'axios'
import { useState } from 'react'
import { useLogin } from '../reducers/combineContext'

function useUserLogin(url) {
  const [value, setValue] = useState(null)
  const [login, loginDispatch] = useLogin()

  const userLogin = async (userCredentials) => {
    const req = await axios.post(url, userCredentials)
    loginDispatch({ type: 'direct', payload: req.data })
    setValue(req.data)
    window.localStorage.setItem('loggedInUser', JSON.stringify(req.data))
    return req.data
  }

  return [value, userLogin]
}

export default useUserLogin
