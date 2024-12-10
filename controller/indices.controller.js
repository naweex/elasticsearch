const createHttpError = require('http-errors');
const { elasticClient } = require('../config/elastic.config');
async function createNewIndex(req , res , next){
    try {
        const {indexName} = req.body;
        if(!indexName) throw createHttpError.BadRequest('invalid input')
        const result = await elasticClient.indices.create({index : indexName})
        return res.json({
            result,
            message : 'index created successfully'
        })
    } catch (error) {
        next(error)
    }
}
async function removeIndex(req , res , next){
    try {
        const {indexName} = req.params;
        const removeResult = elasticClient.indices.delete({index : indexName})
        return res.json(removeResult)
    } catch (error) {
        next(error)
    }
}
async function getIndices(req , res , next){
    try {
        const indices = await elasticClient.indices.getAlias();
        const regexp = /^\.+/
        return res.json({
            indices : Object.keys(indices).filter(item => !regexp.test(item))
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createNewIndex ,
    getIndices , 
    removeIndex
}