import { useState } from 'react'

function Item({ blog, deleteItem, addLikes, user }) {

    const [btnLabel, setBtnLabel] = useState('view')
    const [show, setShow] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyles = {
        padding: '10px 0 0 2px',
        border: '1px solid',
        marginBottom: '5px'
    }

    const listStyles = {
        display: show ? '' : 'none'
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
    const delBtnStyles = { display: user === blog.user.username ? '' : 'none' }

    return (
        <div style={blogStyles} className='aBlog'>
            <li className='blogItem'>{blog.title}, {blog.author} <button onClick={handleView}>{btnLabel}</button></li>
            <ul style={listStyles} className='blogsList'>
                <li>{blog.url}</li>
                <li data-testid='likesList'>{likes} <button onClick={handleLike}>like</button></li>
                <li>{blog.user.username}</li>
                <button onClick={delBlog} style={delBtnStyles}>remove</button>
            </ul>
        </div>
    )
}

export default Item