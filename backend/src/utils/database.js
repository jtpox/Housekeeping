const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
);

const models = [
    require('../models/users'),
    require('../models/logs'),
];

const modelAssociations = [];

for(const model of models) {
    const dbModel = model(sequelize);

    if(typeof dbModel.associate === 'function') {
        modelAssociations.push(dbModel.associate);
    }
}

for(const associate of modelAssociations) {
    associate(sequelize.models);
}

/*
 * Extra setup for table relations.
 *
sequelize.models.Log.belongsTo(sequelize.models.User, {
    as: 'offender',
    foreignKey: 'from_user',
});

sequelize.models.Log.belongsTo(sequelize.models.User, {
    as: 'victim',
    foreignKey: 'to_user',
});

sequelize.models.User.hasMany(sequelize.models.Log, {
    as: 'offender',
    foreignKey: 'from_user'
});

sequelize.models.User.hasMany(sequelize.models.Log, {
    as: 'victim',
    foreignKey: 'to_user'
}); */


const db = {
    Sequelize,
    sequelize,
};

module.exports = db;