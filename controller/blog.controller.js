const { elasticClient } = require("../config/elastic.config");
const indexBlog = 'blog'
async function getAllBlogs(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function createNewBlog(req , res , next){
    try {
        const {title , author , text} = req.body;
        const createResult = await elasticClient.index({
            index : indexBlog ,
            document : {
                title ,
                author ,
                text
            }
        })
        return res.json(createResult)
    } catch (error) {
        next(error)
    }
}
async function removeBlog(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByMultiField(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBlogs ,
    createNewBlog ,
    removeBlog ,
    searchByTitle ,
    searchByMultiField ,
    searchByRegexp
}