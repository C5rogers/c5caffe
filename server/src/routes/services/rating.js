const { Router } = require('express')
const RatingController = require('../../controller/services/Ratings')
const middleware = require('../../middlewares/authCheck')

const router = Router()

router.post('/product/:id/rate', middleware.protect_with_auth, RatingController.Product_rate)
router.post('/product_catagory/:id/rate', middleware.protect_with_auth, RatingController.Product_catagory_rate)


module.exports = router