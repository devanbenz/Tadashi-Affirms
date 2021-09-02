const photoRouter = require('express').Router()
const AWS = require('aws-sdk')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')


// Create multer storage Object, sets destination file to uploads 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // THIS PART ENSURES THE FILE WILL BE .png|.jpg|.jpeg and not a binary file
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({storage:storage, fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}})

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

photoRouter.post('/', upload.single('file') ,(req, res) => {
    console.log(req.file)
    res.send('console')
})


module.exports = {
    photoRouter
}