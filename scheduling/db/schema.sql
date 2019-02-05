CREATE DATABASE appointment_db;

USE appointment_db;

CREATE TABLE appointment(
    uuid VARCHAR(35),
    patient_name BOOLEAN NOT NULL,
    appointment_date INT NOT NULL,
    appointment_time INT NOT NULL,
    unavailable BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(uuid)
);