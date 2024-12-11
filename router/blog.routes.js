const { createNewBlog, getAllBlogs, removeBlog, updateBlog , updateBlog2, searchByTitle } = require('../controller/blog.controller')

const blogRouter = require('express').Router()

blogRouter.post('/create' , createNewBlog)
blogRouter.get('/list/:value?' , getAllBlogs)
blogRouter.delete('/delete/:id' , removeBlog)
blogRouter.put('/update/:id' , updateBlog)
blogRouter.put('/update2/:id' , updateBlog2)
blogRouter.get('/findByTitle' , searchByTitle)
module.exports = {
    blogRouter
}