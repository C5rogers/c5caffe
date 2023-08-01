const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const validations = require('../../middlewares/validations')
const ProductController = require('../../controller/services/Product')
const multer = require('multer')
const { ProductStorageImages } = require('../../../storage')


const upload = multer({ storage: ProductStorageImages })
const router = Router()

//dont forgate to validate the product while it is create and also delete and update too
router.get('/', ProductController.Products_get)
router.get('/:id', ProductController.Product_get)
router.post('/create', middleware.protect_with_auth, middleware.check_auth_admin, upload.single('image'), validations.custome_product_create_validation, ProductController.Product_create)
router.put('/update/:id', middleware.protect_with_auth, middleware.check_auth_admin, upload.single('image'), ProductController.Product_edit)
router.delete('/delete/:id', middleware.protect_with_auth, middleware.check_auth_admin, ProductController.Product_delete)

module.exports = router