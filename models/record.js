module.exports = function(sequelize,DataTypes){
    var Record = sequelize.define("Record",{
        event: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,]
            }
        },
        address: {
            type: DataTypes.STRING,
            validate: {
                len: [1,35]
            }
        },
        city: {
            type: DataTypes.STRING,
            validate: {
                len: [1,30]
            }
        },
        state: {
            type: DataTypes.STRING,
            validate: {
                len: [1,2]
            }
        },
        zip: {
            type: DataTypes.STRING,
            validate:{
                len: [5]
            }
        }
    });

    Record.associate = function(models){
        Record.belongsTo(models.Patient,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Record;
}