const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (req, res, next) => {
    try {
        const results = await Blog.find({}).populate('user', { username: 1, name: 1 })
        res.json(results)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const blog = await Blog.findById(id)
        res.json(blog)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }

})

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        blog.user.toString() === req.user.id.toString() && await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', userExtractor, async (req, res, next) => {
    const body = req.body

    if (!body.title) return res.status(400).json({ error: 'title missing' })
    if (!body.likes) body.likes = 0

    const user = req.user
    body.user = user.id

    const blog = new Blog(body)
    try {
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)

        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedBlog).status(200)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter