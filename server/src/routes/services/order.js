const { Router } = require('express')
const OrderController = require('../../controller/services/Order')
const validations = require('../../middlewares/validations')


const router = Router()

//dont forget to use validation while creating deleting and updating order
router.get('/', OrderController.Orders_get)
router.get('/:id', OrderController.Order_get)
router.post('/create', OrderController.Order_create)
router.put('/update/:id', OrderController.Order_edit)
router.delete('/delete/:id', OrderController.Order_delete)

module.exports = router