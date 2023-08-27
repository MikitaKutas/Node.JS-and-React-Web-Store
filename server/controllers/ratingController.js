const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
class RatingController {
    async create(req, res, next) {
        try {
            const {rate, userId, deviceId} = req.body
            const rating = await Rating.create({rate, userId, deviceId})
            return res.json(rating)
        } catch (e) {
            return next(ApiError.badRequest('Invalid data'))
        }
    }

    async delete(req, res, next){
        try {
            const {userId, deviceId} = req.body
            await Rating.destroy({
                where: {
                    userId: userId,
                    deviceId: deviceId
                }
            })
            return res.json({message:'Deleted successfully'})
        } catch (e) {
            return next(ApiError.badRequest('Invalid data'))
        }
    }

    async get(req, res, next) {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return next(ApiError.badRequest('deviceId is required'));
            }

            const ratings = await Rating.findAll({
                where: { deviceId }
            });

            if (ratings.length === 0) {
                return res.json(null);
            }

            const sum = ratings.reduce(
                (total, rating) =>
                    total + rating.rate, 0
            );
            const averageRating = sum / ratings.length;

            return res.json(averageRating);
        } catch (error) {
            return next(ApiError.badRequest('Invalid data'));
        }
    }

}

module.exports = new RatingController()