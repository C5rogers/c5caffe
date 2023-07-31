const { Router } = require('express')
const RatingController = require('../../controller/services/Ratings')

const router = Router()

router.post('/product/:id/like', RatingController.Product_like)
router.post('/product/:id/dislike', RatingController.Product_dislike)
router.post('/product_catagory/:id/like', RatingController.Product_catagory_like)
router.post('/product_catagory/:id/dislike', RatingController.Product_catagory_dislike)

module.exports = router