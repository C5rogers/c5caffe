const { Router } = require('express')
const RatingController = require('../../controller/services/Ratings')

const router = Router()

router.post('/product/like', RatingController.Product_like)
router.post('/product/dislike', RatingController.Product_dislike)
router.post('/product_catagory/like', RatingController.Product_catagory_like)
router.post('/product_catagory/dislike', RatingController.Product_catagory_dislike)

module.exports = router