const User = require('../database/schemas/User')
const Cart = require('../database/schemas/Cart')
const Product = require('../database/schemas/Product')


const validate_total_order_price = (total_price, ammount, unit_price) => {
    const computed_total_price = ammount * unit_price
    if (computed_total_price == total_price) {
        return true
    } else {
        return false
    }
}
const create_cart_from_cookie = async(carts, user_id) => {
    if (carts.length > 0) {
        const cart_ids = []
        carts.forEach(async(cart) => {
            const ammount = Number(cart.ammount)
            if (!isNaN(ammount)) {
                const product = await Product.findOne({ _id: cart.product_id })
                const user = await User.findOne({ _id: user_id })
                const total_price = product.price * ammount
                const newCart = await Cart.create({ user, product, ammount, overall_price: total_price })
                cart_ids.push(newCart._id)
            }
        });
        return cart_ids
    } else {
        return false
    }
}
const get_total_order_price = async(carts) => {
    let overall_order_price = 0
    carts.forEach(cart => {
        overall_order_price += cart.overall_price
    })
    return overall_order_price
}

module.exports = {
    validate_total_order_price,
    create_cart_from_cookie,
    get_total_order_price
}