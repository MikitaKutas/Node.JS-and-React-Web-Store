const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.post('/', ratingController.create)
router.delete('/', ratingController.delete)
router.get('/', ratingController.get)

module.exports = router