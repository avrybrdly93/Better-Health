var uuidv1 = require("uuid/v1");

module.exports = function(sequelize,DataTypes){
    var Appointment = sequelize.define("Appointment",{
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,30]
            }
        },
        appt_reason:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        staff_id:{
            type: DataTypes.UUID,
            allowNull: false
        },
        staff_fName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        staff_lName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        patient_id:{
            type: DataTypes.UUID,
            allowNull: false
        },
        patient_fName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        patient_lName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30]
            }
        },
        hasPassed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }

    });

    return Appointment;
}