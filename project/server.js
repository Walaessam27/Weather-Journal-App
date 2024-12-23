const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize projectData as an object
let projectData = {};

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

// Define the port
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// GET route
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route 
    app.post('/add', (req, res) => {
    console.log('POST request received:', req.body);
    projectData = { ...req.body }; 
    res.send(projectData);
});
