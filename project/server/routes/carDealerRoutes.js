const router = require('express').Router()
const carController = require('../controllers/carDealerController')
const {tokenMiddleware,checkCar, checkAdmin}= require('../middleware/tokenMiddleware')


router.get(`/cardealers`,carController.getAllCarDealers)
router.get(`/cardealercount`,carController.getCarDealerCount)

router.delete(`/deletecardealer/:id`,tokenMiddleware,checkCar,checkAdmin,carController.deleteCarDealer)
router.post(`/addcardealer`,tokenMiddleware,checkAdmin,carController.addCarDealer)
router.put(`/updatecardealer/:id`,tokenMiddleware,checkCar,checkAdmin,carController.updateCarDealer)

module.exports = router