const { createNewIndex } = require('../controller/indices.controller');

const indicesRoutes = require('express').Router();

indicesRoutes.get('/create' , createNewIndex)


module.exports = {
    indicesRoutes
}