const multer = require('multer')
const path = require('path')
const { getUniqueFileName } = require('./src/utils/fileRelated')

const ProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/profile') },
    filename: (req, file, cb) => {
        const uniqueSuffix = getUniqueFileName()
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
})

const ProductStorageImages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/products/images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = getUniqueFileName()
        const fileExtension = path.extname(file.originalname)
        cb(null, file.filename + '-' + uniqueSuffix + fileExtension)
    }
})

const ProductStorageVideios = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/products/videos')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = getUniqueFileName()
        const fileExtension = path.extname(file.originalname)
        cb(null, file.filename + '-' + uniqueSuffix + fileExtension)
    }
})

module.exports = {
    ProfileStorage,
    ProductStorageImages,
    ProductStorageVideios
}