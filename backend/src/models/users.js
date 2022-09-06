const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Users = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        mobile_number: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        },
        user_group: {
            type: DataTypes.ENUM('user', 'manager', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'new',
        },
    }, {
        paranoid: true,
    });

    Users.associate = (models) => {
        models.User.hasMany(sequelize.models.Log, {
            as: 'offender',
            foreignKey: 'from_user'
        });
        
        models.User.hasMany(sequelize.models.Log, {
            as: 'victim',
            foreignKey: 'to_user'
        });
    }
    
    return Users;
};