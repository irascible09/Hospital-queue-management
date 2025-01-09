const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sanjay@123',  // Update with your MySQL password
    database: 'mediLab'  // Your MySQL database
});

db1.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route for handling form submissions
app.post('/submit-appointment', (req, res) => {
    const { first_name, last_name, email, mobile_number, nic, dob, gender, appointment_date, appointment_time, department, doctor_name, address } = req.body;

    // Generate a random ticket number
    const ticket_no = Math.random().toString(36).substr(2, 9); 

    // Insert data into MySQL database
    const sql = `
        INSERT INTO appointments (first_name, last_name, email, mobile_number, nic, dob, gender, appointment_date, appointment_time, department, doctor_name, address, ticket_no)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db1.query(sql, [first_name, last_name, email, mobile_number, nic, dob, gender, appointment_date, appointment_time, department, doctor_name, address, ticket_no], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data into database');
        } else {
            res.status(200).send(`Appointment booked. Ticket No: ${ticket_no}`);
        }
    });
});

app.post('/submit-patient', (req, res) => {
    const { patient_name, age, medical_condition, gender, bed_type } = req.body;

    // Insert data into MySQL database
    const sql = `
        INSERT INTO patient (patient_name, age, medical_condition, gender, bed_type)
        VALUES (?, ?, ?, ?, ?)
    `;

    db1.query(sql, [patient_name, age, medical_condition, gender, bed_type], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data into database');
        } else {
            res.status(200).send('Patient admitted.');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
