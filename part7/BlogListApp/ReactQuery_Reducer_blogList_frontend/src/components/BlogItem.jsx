import { useState } from 'react'

import { useLogin } from '../reducers/combineContext'
import { Link } from 'react-router-dom'

function Item({ blog, deleteItem, addLikes }) {
  const [btnLabel, setBtnLabel] = useState('view')
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const [login, loginDispatch] = useLogin()

  const blogStyles = {
    padding: '10px 0 0 2px',
    border: '1px solid',
    marginBottom: '5px',
  }

  const listStyles = {
    display: show ? '' : 'none',
  }

  function delBlog() {
    return deleteItem(blog)
  }

  function handleView() {
    setShow(!show)
    btnLabel === 'view' ? setBtnLabel('hide') : setBtnLabel('view')
  }

  function handleLike() {
    const newLikesVal = likes + 1
    setLikes(newLikesVal)
    addLikes(blog)
  }
  const id = blog.user.id === undefined ? blog.user : blog.user.id
  const delBtnStyles = { display: login && login.id === id ? '' : 'none' }

  return (
    <div style={blogStyles} className="aBlog">
      <Link className="blogItem" to={blog.id}>
        {blog.title}, {blog.author}
        <button onClick={handleView}>{btnLabel}</button>
      </Link>
      <ul style={listStyles} className="blogsList">
        <li>{blog.url}</li>
        <li data-testid="likesList">
          {likes} <button onClick={handleLike}>like</button>
        </li>
        <li>{blog.user.username}</li>
        <button onClick={delBlog} style={delBtnStyles}>
          remove
        </button>
      </ul>
    </div>
  )
}

export default Item
