const { elasticClient } = require("../config/elastic.config");
const {EventEmitter} = require("events")
const { resourceLimits } = require("worker_threads")
const event = new EventEmitter()
const indexBlog = 'blog'
async function getAllBlogs(req , res , next){
    try {
        const value = req.params.value;
        const blogs = await elasticClient.search({
            index : indexBlog ,
            q : value
        })
        return res.json(blogs.hits.hits)
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
async function saveToElastic(){
    event.on("saveToElastic", (finalData) => {
        elasticClient.index({
            index: indexBlog, 
            document : finalData
        })
    })
}
async function removeBlog(req , res , next){
    try {
        const {id} = req.params;
        const deletedResult = await elasticClient.deleteByQuery({
            index : indexBlog ,
            query : {
                match : {
                    _id : id
                }
            }
        })
        return res.json(deletedResult)
    } catch (error) {
        next(error)
    }
}
async function updateBlog(req , res , next){
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const blog = (await elasticClient.search({index: indexBlog, query: {match: {_id: id}}})).hits.hits?.[0] || {};
        const payload = blog?._source || {}
        const updateResult = await elasticClient.index({
            index: indexBlog,
            id,
            body: {...payload, ...data}
        })
        return res.json(updateResult)
    } catch (error) {
        
    }
}
async function updateBlog2(req, res, next) {
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const updateResult = await elasticClient.update({
            index: indexBlog,
            id,
            doc: data
        })
        return res.json(updateResult)
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req , res , next){
    try {
        const {title} = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                match: {
                    title
                }
            }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function searchByMultiField(req , res , next){
    try {
        const {search} = req.query; 
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                multi_match: {
                    query: search,
                    fields: ["title", "text", "author"]
                }
            }
        })
        const blogs = result.hits.hits
        return res.json(blogs)
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req , res , next){
    try {
        const {search} = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                regexp: {
                    title: `.*${search}.*`
                }
            }
    })
    return res.json(result.hits.hits)
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
    searchByRegexp ,
    updateBlog ,
    updateBlog2
}