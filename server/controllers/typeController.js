const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }


    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res, next) {
        const {name} = req.body
        try {
            const deletedType = await Type.destroy({
                where: {
                    name: name
                }
            });

            if (deletedType > 0) {
                return res.json({message: 'Deleted successfully'})
            } else {
                return  next(ApiError.badRequest('The specified name not found'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new TypeController()