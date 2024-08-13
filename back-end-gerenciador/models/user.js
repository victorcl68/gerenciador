const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');

class User extends Model {
    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
    },
});

module.exports = User;
