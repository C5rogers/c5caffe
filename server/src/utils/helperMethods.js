const validate_total_order_price = (total_price, ammount, unit_price) => {
    const computed_total_price = ammount * unit_price
    if (computed_total_price == total_price) {
        return true
    } else {
        return false
    }
}
module.exports = {
    validate_total_order_price
}