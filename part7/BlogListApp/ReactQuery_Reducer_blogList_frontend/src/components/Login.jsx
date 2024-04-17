import { useState } from 'react'
import { styles } from '../Styles'

const { Form, FormBtn, Input } = styles

function LoginForm({ login }) {
  const [userInfos, setUserInfos] = useState({
    username: '',
    password: '',
  })

  function handleLogin(e) {
    e.preventDefault()
    login(userInfos)
    setUserInfos({
      username: '',
      password: '',
    })
  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Input
          placeHolder="username"
          type="text"
          name="username"
          value={userInfos.username}
          onChange={({ target }) =>
            setUserInfos({ ...userInfos, username: target.value })
          }
        />
        <Input
          placeHolder="password"
          type="password"
          name="password"
          value={userInfos.password}
          onChange={({ target }) =>
            setUserInfos({ ...userInfos, password: target.value })
          }
        />
        <FormBtn type="submit">login</FormBtn>
      </Form>
    </>
  )
}

export default LoginForm
