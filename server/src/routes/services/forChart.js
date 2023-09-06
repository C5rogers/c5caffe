const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const ChartController = require('../../controller/services/Chart')



const router = Router()

router.get('/data', middleware.protect_with_auth, ChartController.Chart_data_get)

module.exports = router