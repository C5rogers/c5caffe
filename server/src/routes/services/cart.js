const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const validation = require('../../middlewares/validations')
const CartController = require('../../controller/services/Cart')

const router = Router()

router.get('/', CartController.Carts_get)
router.get('/:id', CartController.Cart_get)
router.post('/create', validation.custome_cart_create_validation, CartController.Cart_create)
router.put('/update', CartController.Cart_update)
router.delete('/delete', CartController.Cart_delete)

module.exports = router