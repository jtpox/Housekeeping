const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Logs = sequelize.define('Log', {
        from_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        log: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        paranoid: true,
    });
    
    Logs.associate = (models) => {
        models.Log.belongsTo(sequelize.models.User, {
            as: 'offender',
            foreignKey: 'from_user',
        });
        
        models.Log.belongsTo(sequelize.models.User, {
            as: 'victim',
            foreignKey: 'to_user',
        });
    };

    /*
     * Add a new entry into the log table.
     */
    Logs.addEntry = (
        perpetrator,
        victim,
        action,
        log,
    ) => {
        const newEntry = Logs.build({
            from_user: perpetrator,
            to_user: victim,
            action,
            log,
        });

        return newEntry.save().then(result => result);
    };

    return Logs;
};