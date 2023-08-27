const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.delete('/', typeController.delete)
router.get('/', typeController.getAll)

module.exports = router