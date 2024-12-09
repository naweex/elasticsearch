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
        
    } catch (error) {
        next(error)
    }
}
async function getIndices(req , res , next){
    try {
        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createNewIndex
}