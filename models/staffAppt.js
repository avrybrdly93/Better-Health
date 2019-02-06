module.exports = function(sequelize,DataTypes){
    var staffAppt = sequelize.define("staffAppt",{
        patient_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        time: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,]
            }
        },
        room: {
            type: DataTypes.STRING,
            validate: {
                len: [1,35]
            }
        },
        reason: {
            type: DataTypes.STRING,
            validate: {
                len: [1,30]
            }
        }
    });

    staffAppt.associate = function(models){
        staffAppt.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return staffAppt;
}