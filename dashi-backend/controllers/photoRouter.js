const photoRouter = require('express').Router()
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { v4: uuidv4 } = require('uuid')

AWS.config.update({region:'us-east-1'})

let s3 = new AWS.S3({apiVersion: '2006-03-01'})

const bucketParams = {
    Bucket: 'tadashi-img-bucket',
}

const upload = multer({
    storage:multerS3({
        s3: s3,
        bucket: 'tadashi-img-raw',
        metadata: function (req, file, cb){
            cb(null, {fieldName: uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-')})
        },
        key: function (req, file, cb) {
            cb(null, uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-'))
        }
    }), 
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}})


photoRouter.get('/', async (req, res) => {
    try{
        const data = await s3.listObjectsV2(bucketParams).promise()
        res.status(200).json(data)
    }catch(e){
        res.status(400).json({err: e})
    }
})

photoRouter.post('/', upload.single('file') ,(req, res) => {
    res.status(200).end()
})


module.exports = {
    photoRouter
}