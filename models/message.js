var uuidv1 = require("uuid/v1");

module.exports=function(sequelize,DataTypes){
    var Message=sequelize.define("Message",{
        body:{
            type: DataTypes.BODY,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sender_id:{
            type: DataTypes.UUID,
            allowNull: false
        },
        sender_fName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        sender_lName:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1,30]
            }
        },
        receiver_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        receiver_fName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        receiver_lName:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1,30]
            }
        },
    });

    return Message;
}