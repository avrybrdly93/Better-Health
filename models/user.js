var uuidv1 = require("uuid/v1");
var bcrypt = require("bcrypt");

module.exports=function(sequelize,DataTypes){
    var User = sequelize.define("User",{
        uuid : {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,35]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,2]
            }
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [5]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [12]
            }
        },
        isPatient: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        account_key:{
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [8]
            }
        }
    });

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.account_key);
    };

    User.associate = function(models){
        User.hasMany(models.Message,{
            onDelete: "cascade"
        });
    };

    User.associate = function(models){
        User.hasMany(models.Record,{
            onDelete: "cascade"
        });
    }

    return User;
}