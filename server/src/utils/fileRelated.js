const crypto = require('crypto')

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
module.exports = {
    generateHashedFileName,
    getFileExtension,
    getUniqueFileName
}