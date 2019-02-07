var uuidv1 = require("uuid/v1");

module.exports = function(sequelize,DataTypes){
    var sMessage = sequelize.define("sMessage",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        receiver: {
            type: DataTypes.UUID
        }
    });

    sMessage.associate = function(models){
        sMessage.belongsTo(models.Staff,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return sMessage;
}