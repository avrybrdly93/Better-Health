DROP TABLE IF EXISTS patient; 

CREATE TABLE patient (
  patient_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(20),
  last_name VARCHAR(50),
  address_firstline VARCHAR(100),
  address_secondline VARCHAR(100),
  zipcode VARCHAR(10),
  city VARCHAR(20),
  phone VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  confirm BOOLEAN, 
  PRIMARY KEY(patient_id)
  
);

-- INSERT INTO patient(first_name,last_name, address_firstline, address_secondline, zipcode, city, phone, email,password) VALUES('John','Richardson', '15 Boo street', '12-23', '19283', 'Corona', '5177767676', 'john@gmail.com', '12jsjdjf');
-- 
-- SELECT * FROM patient; 

DROP TABLE IF EXISTS medHistory;

CREATE TABLE medHistory (
med_id  INT PRIMARY KEY,
id INT,
first_name VARCHAR(40),
last_name VARCHAR(40),
consultation_date DATE,
doctor VARCHAR(100),
case_type VARCHAR(225),
insurance VARCHAR(100),
location VARCHAR(225),
insurance_date DATE,
treatment_details VARCHAR(225),
FOREIGN KEY(id) REFERENCES patient(patient_id)
);
-- SELECT * FROM medHistory; 




