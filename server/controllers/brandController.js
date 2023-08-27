const {Type, Brand} = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }


    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res, next) {
        const {name} = req.body
        try {
            const deletedBrand = await Brand.destroy({
                where: {
                    name: name
                }
            });

            if (deletedBrand > 0) {
                return res.json({message: 'Deleted successfully'})
            } else {
                return  next(ApiError.badRequest('The specified name not found'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BrandController()