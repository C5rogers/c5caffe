const { Router } = require('express')
const SelledOrderController = require('../../controller/services/SelledOrder')
const middleware = require('../../middlewares/authCheck')

const router = Router()

router.get('/', SelledOrderController.Selled_orders_get)
router.get('/mine', middleware.protect_with_auth, SelledOrderController.Selled_order_mine_get)
router.get('/:id', middleware.protect_with_auth, SelledOrderController.Selled_order_get)
router.delete('/:id', middleware.protect_with_auth, SelledOrderController.Selled_order_delete)

module.exports = router