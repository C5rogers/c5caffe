const { Router } = require('express')
const SelledOrderController = require('../../controller/services/SelledOrder')

const router = Router()

router.get('/', SelledOrderController.Selled_orders_get)
router.get('/:id', SelledOrderController.Selled_order_get)
router.delete('/:id', SelledOrderController.Selled_order_delete)

module.exports = router