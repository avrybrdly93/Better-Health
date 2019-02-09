var uuidv1 = require("uuid/v1");

module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sender_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        sender_fName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        sender_lName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
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
                len: [1, 30]
            }
        },
        receiver_lName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
    });

    Message.searchMsgs = function (firstID, otherID) {
        var msgQuery = "SELECT body,createdAt,sender_id,receiver_id FROM messages WHERE (sender_id='" + firstID;
        msgQuery += "' OR receiver_id='" + firstID + "') AND (sender_id='" + otherID + "' OR receiver_id='" + otherID;
        msgQuery += "') ORDER BY createdAt ASC";

        sequelize.query(msgQuery, { })
        .then(function(result){
            //console.log(result[0]);
            return result[0];
        });
    }

    return Message;
}