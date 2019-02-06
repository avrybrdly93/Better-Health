module.exports = function(sequelize,DataTypes){
    var pAppt = sequelize.define("pAppt",{
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,30]
            }
        },
        doctor_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        }
    });

    pAppt.associate = function(models){
        pAppt.belongsTo(models.Patient,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return pAppt;
}