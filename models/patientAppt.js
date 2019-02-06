module.exports = function(sequelize,DataTypes){
    var pAppt = sequelize.define("pAppt",{
        reason:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
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