const { Router } = require('express')
const RatingController = require('../../controller/services/Ratings')
const middleware = require('../../middlewares/authCheck')

const router = Router()

router.post('/product/:id/like', middleware.protect_with_auth, RatingController.Product_like)
router.post('/product/:id/dislike', middleware.protect_with_auth, RatingController.Product_dislike)
router.post('/product_catagory/:id/like', middleware.protect_with_auth, RatingController.Product_catagory_like)
router.post('/product_catagory/:id/dislike', middleware.protect_with_auth, RatingController.Product_catagory_dislike)

module.exports = router