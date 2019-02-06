var uuidv1 = require("uuid/v1");

module.exports = function(sequelize,DataTypes){
    var pMessage = sequelize.define("pMessage",{
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

    pMessage.associate = function(models){
        pMessage.belongsTo(models.Patient,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    return pMessage;
}