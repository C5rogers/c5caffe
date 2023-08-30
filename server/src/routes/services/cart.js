const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const validation = require('../../middlewares/validations')
const CartController = require('../../controller/services/Cart')

const router = Router()

router.get('/', CartController.Carts_get)
router.get('/:id', CartController.Cart_get)
router.post('/create', validation.custome_cart_create_validation, CartController.Cart_create)
router.put('/:id/update', CartController.Cart_update)
router.delete('/:id/delete', CartController.Cart_delete)
router.get('/favorite/product', CartController.Cart_favorite_products)


module.exports = router