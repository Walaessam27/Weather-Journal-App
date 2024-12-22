// Declare projectData using 'const' since its value won't change
const projectData = {};

// Import Express, bodyParser, and cors
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Start up an instance of app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// Spin up the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post Route
app.post('/add', (req, res) => {
    Object.assign(projectData, req.body);
    res.send(projectData);
});
