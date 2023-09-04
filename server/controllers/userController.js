const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJWT = (id, email, role) =>jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email or password'))
        }

        const expectant = await User.findOne({where: {email}})
        if (expectant) {
            return next(ApiError.badRequest('A user with same email already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)

        return res.json(token)
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('A user with this email doesn\'t exist'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Password is incorrect'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json(token)
    }

    async check(req, res, next) {
        try {
            const token = generateJWT(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            return next(ApiError.internal("Internal error"))
        }
    }
}

module.exports = new UserController()