const AllRouters = require('express').Router();

AllRouters.get('/' , (req , res) => {
    res.render('pages/index',{
        message : 'hello express'
    })
})


module.exports = {
    AllRouters
}