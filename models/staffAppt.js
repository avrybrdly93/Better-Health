module.exports = function(sequelize,DataTypes){
    var sAppt = sequelize.define("sAppt",{
        reason:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
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