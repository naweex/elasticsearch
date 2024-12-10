const { createNewBlog } = require('../controller/blog.controller')

const blogRouter = require('express').Router()

blogRouter.post('/create' , createNewBlog)

module.exports = {
    blogRouter
}