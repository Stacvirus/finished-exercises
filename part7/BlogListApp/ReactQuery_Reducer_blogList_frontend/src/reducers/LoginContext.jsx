import { createContext } from 'react'

const LoginContext = createContext()

export function loginReducer(state, action) {
  return action.payload
}

export default LoginContext
