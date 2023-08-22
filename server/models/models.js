const sequilize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequilize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const basket = sequilize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const basketDevice = sequilize.define('basketDevice', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const device = sequilize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const type = sequilize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const brand = sequilize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const rating = sequilize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const deviceInfo = sequilize.define('deviceInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const typeBrand = sequilize.define('typeBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

user.hasOne(basket)
basket.belongsTo(user)

user.hasMany(rating)
rating.belongsTo(user)

basket.hasMany(basketDevice)
basketDevice.belongsTo(basket)

type.hasMany(device)
device.belongsTo(type)

brand.hasMany(device)
device.belongsTo(brand)

device.hasMany(rating)
rating.belongsTo(device)

device.hasMany(basketDevice)
basketDevice.belongsTo(device)

device.hasMany(deviceInfo)
deviceInfo.belongsTo(device)

type.belongsToMany(brand, {through: typeBrand})
brand.belongsToMany(type, {through: typeBrand})

module.exports = {
    user,
    basket,
    basketDevice,
    device,
    deviceInfo,
    type,
    brand,
    rating,
    typeBrand
}
