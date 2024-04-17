import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddBlog from "../components/AddBlog"
import userEvent from "@testing-library/user-event"
import Item from '../components/BlogItem'

describe('blogs tests', () => {
    let MainContainer = null
    let blog = null
    let user = null
    let addLikes = null
    let deleteItem = null
    beforeEach(async () => {
        deleteItem = jest.fn()
        addLikes = jest.fn()
        user = userEvent.setup()

        blog = {
            title: 'testing a form...',
            author: 'stac virus',
            url: 'fullstack.courseOpen.com',
            likes: '20',
            user: {
                username: "Joe"
            }
        }
        const userInfos = {
            username: "Joe",
            password: 'password'
        }

        const { container } = render(<Item blog={blog} deleteItem={deleteItem} addLikes={addLikes} user={userInfos} />)
        MainContainer = container
    })

    test('displays only title and author', async () => {
        const list = MainContainer.querySelector('.blogItem')
        const details = MainContainer.querySelector('.blogsList')

        expect(list).toBeDefined()
        expect(list).toHaveTextContent(`${blog.title}, ${blog.author}`)
        expect(details).toHaveStyle('display: none')
    })

    test('when user clicks on view btn blog\'s url and likes is displayed', async () => {
        const viewBtn = screen.getByText('view')
        const details = MainContainer.querySelector('.blogsList')
        await user.click(viewBtn)

        expect(details).toHaveStyle('display: block')
    })

    test('likes btn clicked twice', async () => {
        const viewBtn = screen.getByText('view')
        const likesBtn = screen.getByText('like')

        await user.click(viewBtn)
        await user.click(likesBtn)
        await user.click(likesBtn)

        expect(addLikes.mock.calls).toHaveLength(2)
    })
})

describe('test new blog form', () => {
    test('when a new blog is formed it received the right details', async () => {
        const Save = jest.fn()
        const user = userEvent.setup()

        const inputsValues = {
            title: 'testing a form...',
            author: 'stac virus',
            url: 'fullstack.courseOpen.com',
            likes: '20'
        }

        const { container } = render(<AddBlog Save={Save} />)
        const inputs = container.querySelectorAll('#text')

        const sendBtn = screen.getByText('Save')
        const likes = screen.getByPlaceholderText('number of likes')

        await user.type(inputs[0], inputsValues.title)
        await user.type(inputs[1], inputsValues.author)
        await user.type(inputs[2], inputsValues.url)

        fireEvent.change(likes, { 'target': { 'value': inputsValues.likes } })
        await user.click(sendBtn)

        expect(Save.mock.calls[0]).toHaveLength(1)
        expect(Save.mock.calls[0][0]).toEqual(inputsValues)
    })
})