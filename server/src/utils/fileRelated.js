const crypto = require('crypto')
const dotenv = require('dotenv').config('../../.env')
const path = require('path')
const fs = require('fs')

const generateHashedFileName = (extension) => {
    const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex')
    return hash + "." + extension
}

const getFileExtension = (base64Data) => {
    const fileExtension = base64Data.substring(base64Data.indexOf('/') + 1, base64Data.indexOf(';base64'))
    return fileExtension
}
const getUniqueFileName = () => {
    return Date.now() + '-' + Math.round(Math.random() * 1e9)
}

const deleteUploadedProfile = (filename) => {
    let filepath = path.join(dotenv.parsed.UPLOAD_FILE_PATH, '/public/profile', filename)
    fs.unlink(filepath, (error) => {
        if (error) {
            console.log("Error in deleting uploaded profile")
        }
    })
}
const deleteUploadedImage = (filename) => {
    let filepath = path.join(dotenv.parsed.UPLOAD_FILE_PATH, '/public/products/images', filename)
    fs.unlink(filepath, (error) => {
        if (error) {
            console.log("Error in deleting uploaded image file")
        }
    })
}


module.exports = {
    generateHashedFileName,
    getFileExtension,
    getUniqueFileName,
    deleteUploadedProfile,
    deleteUploadedImage
}