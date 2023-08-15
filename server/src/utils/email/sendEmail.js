const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config('../../../.env')


const sendEmail = async(email, subject, payload, template) => {
    try {
        //creating mail transporter
        const transporter = nodemailer.createTransport({
            host: dotenv.parsed.EMAIL_HOST,
            port: 2525,
            auth: {
                user: dotenv.parsed.EMAIL_USERNAME,
                pass: dotenv.parsed.EMAIL_PASSWORD
            }
        })
        const source = fs.readFileSync(path.join(__dirname, template), 'utf-8')
        const compiledTemplate = handlebars.compile(source)


        const options = () => {
            return {
                "from": dotenv.parsed.FROM_EMAIL,
                "to": email,
                "subject": subject,
                "html": compiledTemplate(payload),
            };
        };

        transporter.sendMail(options(), (error, info) => {
            if (error) {
                console.log("there is an error:" + error)
                return error
            } else {
                return true
            }
        })
        return true

    } catch (error) {
        return error
    }
}

module.exports = sendEmail