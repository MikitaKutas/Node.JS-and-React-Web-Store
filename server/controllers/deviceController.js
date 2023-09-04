const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {

            let {brandId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where: {brandId}, limit, offset
                })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where: {typeId}, limit, offset
                })
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where: {brandId, typeId}, limit, offset
                })
            }

            return res.json(devices)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            })

        return res.json(device)
    }

    async delete(req, res, next) {
        const {name} = req.body
        try {
            const deletedDevice = await Device.destroy({
                where: {
                    name: name
                }
            });

            if (deletedDevice > 0) {
                return res.json({message: 'Deleted successfully'})
            } else {
                return  next(ApiError.badRequest('The specified name not found'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new DeviceController()