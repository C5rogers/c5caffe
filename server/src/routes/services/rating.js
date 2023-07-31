const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const RatingController = require('../../controller/services/Ratings')

const router = Router()

router.post('/product/like', middleware.protect_with_auth, RatingController.Product_like)
router.post('/product/dislike', middleware.protect_with_auth, RatingController.Product_dislike)
router.post('/product_catagory/like', middleware.protect_with_auth, RatingController.Product_catagory_like)
router.post('/product_catagory/dislike', middleware.protect_with_auth, RatingController.Product_catagory_dislike)

module.exports = router