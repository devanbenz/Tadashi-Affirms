const photoRouter = require('express').Router()
const AWS = require('aws-sdk')

AWS.config.update({region:'us-east-1'})

let s3 = new AWS.S3({apiVersion: '2006-03-01'})

const bucketParams = {
    Bucket: 'tadashi-img-bucket',
}

photoRouter.get('/', async (req, res) => {
    try{
        const data = await s3.listObjectsV2(bucketParams).promise()
        res.status(200).json(data)
    }catch(e){
        res.status(400).json({err: e})
    }
})


module.exports = {
    photoRouter
}