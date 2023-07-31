const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const validations = require('../../middlewares/validations')
const ProductController = require('../../controller/services/Product')



const router = Router()

router.get('/', ProductController.Products_get)
router.get('/:id', ProductController.Product_get)
router.post('/create', middleware.protect_with_auth, ProductController.Product_create)
router.put('/update', middleware.protect_with_auth, ProductController.Product_edit)
router.delete('/delete', middleware.protect_with_auth, ProductController.Product_delete)

module.exports = router