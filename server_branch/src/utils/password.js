const bcrypt = require('bcryptjs')

const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

const compareHashedPassword = async(password, hashedPassword) => {
    return await bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashedPassword,
    compareHashedPassword
}