module.exports = function(sequelize,DataTypes){
    var patientAppt = sequelize.define("patientAppt",{
        date: {
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
        doctor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,]
            }
        }
    });

    patientAppt.associate = function(models){
        patientAppt.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return patientAppt;
}