import { useEffect, useState, useRef } from 'react'
import Item from './BlogItem'
import AddBlog from './AddBlog'
import serverData from './Server'
import LoginForm from './Login'
import Notification from './Notifications'
import Togglable from './Togglable'

function Blogs() {
    const [blogs, setBlogs] = useState()
    const [user, setUser] = useState(null)
    const [notTxt, setNotTxt] = useState()

    const blogFormRef = useRef()
    const loginFormRef = useRef()
    //useeffect to fetch all blogs at init period
    useEffect(fetchBlogs, [])

    //useeffect to get the user infos from localstorage at init peroid
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            serverData.setToken(user.token)
        }
    }, [])

    function fetchBlogs() {
        serverData.getAllblogs()
            .then(res => {
                setBlogs(res.sort((a, b) => b.likes - a.likes))
            })
    }

    async function deleteBlogFromList(item) {
        const res = blogs.filter(blog => item.id !== blog.id)
        setBlogs(res.sort((a, b) => b.likes - a.likes))
        await serverData.deleteBlog(item.id)
    }

    const handleDelete = async (item) => {
        window.confirm(`Remove blog: ${item.title}, by ${item.author}`) && deleteBlogFromList(item)
        // fetchBlogs()
    }

    const handleSaveBlogs = async (blogObject) => {
        try {
            await serverData.addBlog(blogObject)
            fetchBlogs()
            setNotTxt({
                text: `new blog created, ${blogObject.title}`,
                clr: 'green'
            })
            removeNofication()
            blogFormRef.current.handleVisibility()
        } catch (error) {
            setNotTxt({
                text: `${error.response.data.error}`,
                clr: 'red'
            })
            removeNofication()
        }
    }

    const handleLogin = async (userInfos) => {
        try {
            const userToken = (await serverData.userLogin(userInfos))
            window.localStorage.setItem('loggedInUser', JSON.stringify(userToken))
            setUser(userToken)
            serverData.setToken(userToken.token)
            loginFormRef.current.handleVisibility()
        } catch (error) {
            setNotTxt({ text: error.response.data.error, clr: 'red' })
            removeNofication()
            setUser(null)
        }
    }

    function showLogin() {
        return <LoginForm login={handleLogin} />
    }

    function showAddBlogs() {
        return <AddBlog Save={handleSaveBlogs} />
    }

    function handleLogout() {
        window.localStorage.removeItem('loggedInUser')
    }

    function showNotification({ text, clr }) {
        return (
            <Notification text={text} color={clr} />
        )
    }

    function removeNofication() {
        setTimeout(() => {
            setNotTxt(null)
        }, 3000)
    }

    const handleLikes = async (targetBlog) => {
        const newBlog = { ...targetBlog, likes: targetBlog.likes += 1 }
        await serverData.updateBlog(newBlog)
    }

    return (
        <div>
            {
                user && <div>
                    <span className='userMsg'>{user.username} logged in</span><button onClick={handleLogout}>logout</button>
                </div>
            }
            {notTxt && showNotification(notTxt)}
            <Togglable btnLable='log in' ref={loginFormRef}>
                {!user && showLogin()}
            </Togglable>

            <Togglable btnLable='new blogs' ref={blogFormRef}>
                {user && showAddBlogs()}
            </Togglable>
            <h1>Blogs</h1>
            <ul className='screenBlogs'>
                {blogs && blogs.map(b => <Item key={b.id} blog={b} deleteItem={handleDelete} addLikes={handleLikes} user={user && user.username} />)}
            </ul>
        </div>
    )
}

export default Blogs
