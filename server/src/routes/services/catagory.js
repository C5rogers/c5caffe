const { Router } = require('express')
const middleware = require('../../middlewares/authCheck')
const validation = require('../../middlewares/validations')
const CatagoryController = require('../../controller/services/Catagory')



const router = Router()


router.get('/', CatagoryController.Catagorys_get)
router.get('/:id', CatagoryController.Catagory_get)
router.post('/create', validation.custome_catagory_create_validation, CatagoryController.Catagory_create)
router.put('/:id/edit', validation.custome_catagory_create_validation, CatagoryController.Catagory_edit)
router.delete('/:id', CatagoryController.Catagory_delete)


module.exports = router