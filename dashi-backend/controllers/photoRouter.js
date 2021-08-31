const photoRouter = require('express').Router()

photoRouter.get('/', (req, res) => {
    res.status(200).json({title: 'logged in'})
})