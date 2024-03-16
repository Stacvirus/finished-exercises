import { useState } from 'react'

function AddBlog({ Save }) {

    const [blogInfos, setBlogInfos] = useState({
        title: '',
        author: '',
        url: '',
        likes: ''
    })

    function saveblog(e) {
        e.preventDefault()
        Save(blogInfos)
        setBlogInfos({
            title: '',
            author: '',
            url: '',
            likes: ''
        })
    }

    return (
        <div className='formDiv'>
            <h1>Add blogs</h1>
            <form onSubmit={saveblog}>
                title
                <input
                    id='text'
                    type="text"
                    name="title"
                    value={blogInfos.title}
                    data-testid='title'
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, title: target.value })}
                /> <br />
                author
                <input
                    id='text'
                    type="text"
                    name="author"
                    value={blogInfos.author}
                    data-testid='author'
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, author: target.value })}
                /><br />
                url
                <input
                    id='text'
                    type="text"
                    name="url"
                    value={blogInfos.url}
                    data-testid='url'
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, url: target.value })}
                /><br />
                likes
                <input
                    id='number'
                    type="number"
                    name="likes"
                    value={blogInfos.likes}
                    placeholder='number of likes'
                    data-testid='likes'
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, likes: target.value })}
                /><br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddBlog