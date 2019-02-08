var uuidv1 = require("uuid/v1");
var bcrypt = require("bcrypt");

module.exports=function(sequelize,DataTypes){
    var Patient = sequelize.define("Patient",{
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
                len: [3,15]
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
                len: [2]
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
                len: [1,100],
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        account_key:{
            type: DataTypes.STRING,
            required: true,
        }
    });

    Patient.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    Patient.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.account_key);
    };

    Patient.findDoctor=function(){
        
    };

    Patient.associate = function(models){
        Patient.belongsTo(models.Staff,{
            foreignKey: {
                allowNull: false
            }
        });
    }

    Patient.associate = function(models){
        Patient.hasMany(models.Record,{
            onDelete: "cascade"
        });
    }

    return Patient;
}