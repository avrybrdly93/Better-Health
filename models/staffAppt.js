module.exports = function(sequelize,DataTypes){
    var sAppt = sequelize.define("sAppt",{
        patient_name: {
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
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        room_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        visit_reason: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,30]
            }
        }
        
    });

    sAppt.associate = function(models){
        sAppt.belongsTo(models.Staff,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return sAppt;
}