import { useLoaderData } from 'react-router-dom'

import { styles } from '../Styles'
const { Cmt, BlogS } = styles

function User() {
  const user = useLoaderData()

  return (
    <div>
      <BlogS style={{ fontSize: '35px', fontWeight: 'bold' }}>
        {user.username}
      </BlogS>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.length > 0 ? (
          user.blogs.map((b) => <Cmt key={b.id}>{b.title}</Cmt>)
        ) : (
          <p>no blog created</p>
        )}
      </ul>
    </div>
  )
}

export default User
