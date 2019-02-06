var uuidv1 = require("uuid/v1");
var bcrypt = require("bcrypt");

module.exports=function(sequelize,DataTypes){
    var Staff = sequelize.define("Staff",{
        uuid : {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,10]
            }
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,30]
            }
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        account_key:{
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [8]
            }
        }
    });

    Staff.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    Staff.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.account_key);
    };

    Staff.associate = function(models){
        Staff.hasMany(models.sMessage,{
            onDelete: "cascade"
        });
    };

    Staff.associate = function(models){
        Staff.hasMany(models.Patient,{
            onDelete: "no action",
        });
    }

    return Staff;
}
