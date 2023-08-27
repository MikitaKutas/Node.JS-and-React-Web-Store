const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async addDevice(req,res, next){
        try {
            const {basketId, deviceId} = req.body
            const basketDevice = await BasketDevice.create({basketId, deviceId})
            return res.json(basketDevice)
        } catch (e) {
            return next(ApiError.badRequest('Invalid basket or device data'))
        }
    }
    async getAll(req, res, next){
        try {
            let {basketId, deviceId, limit, page} = req.query

            if(!basketId) {
                return next(ApiError.badRequest('Invalid basket'))
            }

            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            let basketDevices;
            let devices;
            if (!deviceId) {
                basketDevices = await BasketDevice.findAndCountAll({
                    where: {basketId},
                    limit,
                    offset
                })

                let deviceIds = basketDevices.rows.map(basketDevices => basketDevices.deviceId)
                devices = await Device.findAndCountAll({
                    where: {id: deviceIds},
                    limit,
                    offset
                })
            }

            return res.json(devices)

        } catch (e) {
            return next(ApiError.badRequest('Invalid basket or device data'))
        }
    }

    async delete(req, res, next){
        try {
            const {basketId, deviceId} = req.body
            const basketDevice = await BasketDevice.destroy({
                where: {
                    basketId: basketId,
                    deviceId: deviceId
                }
            })
            return res.json({message: "Deleted successfully"})
        } catch (e) {
            return next(ApiError.badRequest('Invalid basket or device data'))
        }
    }
}

module.exports = new BasketController()