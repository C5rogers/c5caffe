const axios = require('axios')
const dotenv = require('dotenv').config('../../.env')

const init_payment = async(form) => {
    const body = {
        "amount": form.verifyed_total_price,
        "currency": "ETB",
        "email": form.email,
        "first_name": form.username,
        "phone_number": form.phone,
        "tx_ref": "user-" + form.id,
        "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        "return_url": "https://www.google.com/",
        "customization[title]": "c5caffe payment",
        "customization[description]": "Our system integrate the most relayeble and easy payment system for our users to have awsome shoping time"
    }
    const headers = {
        'Authorization': "Bearer " + dotenv.parsed.CHAPA_SECRET_KEY,
        'Content-Type': 'application/json'
    }
    try {
        const chapaResponce = await axios.post(dotenv.parsed.CHAPA_PAYMENT_ENDPOINT, body, { headers })
        return chapaResponce
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    init_payment,
}