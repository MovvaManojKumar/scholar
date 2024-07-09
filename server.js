const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(__dirname));

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodeuser@1234', // Replace with your MySQL password
    database: 'manoj'  // Replace with your database name
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Route to serve the home.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle the AJAX form submission
// app.post('/submit', (req, res) => {
//     const { email, name, phoneNumber, age, branch, roll } = req.body;
//     const query = 'INSERT INTO students (email, name, phoneNumber, age, branch, roll) VALUES (?, ?, ?, ?, ?, ?)';
//     const values = [email, name, phoneNumber, age, branch, roll];

//     db.query(query, values, (err, result) => {
//         if (err) {
//             res.status(500).send('Error saving data.');
//             return;
//         }
//         console.log('Data inserted:', result);
//         res.send('Data saved successfully!');
//     });
// });
app.post('/submit', (req, res) => {
    const { email, name, phoneNumber, age, branch, roll } = req.body;
    const query = 'INSERT INTO info (email, name, phoneNumber, age, branch, roll) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [email, name, phoneNumber, age, branch, roll];
    console.log('Received data:', req.body);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);  // Log the error
            res.status(500).send(`Error saving data: ${err.message}`);  // Send a more descriptive error message
            return;
        }
        console.log('Data inserted:', result);
        res.send('Data saved successfully!');
    });
});

app.get('/retrieve', (req, res) => {
    const query = 'SELECT * FROM info';  // Fetch all records from the 'details' table

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send(`Error fetching data: ${err.message}`);
            return;
        }
        res.json(results);  // Send the results as JSON
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
