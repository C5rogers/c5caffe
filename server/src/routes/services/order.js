const { Router } = require('express')
const OrderController = require('../../controller/services/Order')
const validations = require('../../middlewares/validations')
const middleware = require('../../middlewares/authCheck')


const router = Router()

//dont forget to use validation while creating deleting and updating order
router.get('/', middleware.protect_with_auth, OrderController.Orders_get)
router.get('/:id', middleware.protect_with_auth, OrderController.Order_get)
router.post('/init', middleware.protect_with_auth, OrderController.Order_init)
router.post('/complete/:id', middleware.protect_with_auth, OrderController.Order_complete)
router.delete('/delete/:id', middleware.protect_with_auth, OrderController.Order_delete)

module.exports = router