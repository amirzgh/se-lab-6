const http = require("http");
const express = require("express");

const port = 4000;
const app = express();
const bodyParser = require('body-parser');
const e = require("express");
const limiter = require('express-rate-limit')

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'postgres-db',  // This is the service name in the Docker Compose file
    database: 'dbname1',
    password: 'hessam123',
    port: 5432,
});

app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 4, name: 'Item 4' },
        { id: 3, name: 'Item 3' }
    ];
    res.json(items);
});

app.post('/api/insert', async (req, res) => {
    try {
        const { id, name } = req.body;

        // Insert data into the PostgreSQL database
        await pool.query('INSERT INTO items (id, name) VALUES ($1, $2)', [id, name]);

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data' });
    }
});

const apiLimiter = limiter(
    {
        windowMs: 5000,
        max: 5,
        message: {
            code: 429,
            message: 'Too many requests ...'
        }
    }
)
app.use(bodyParser.json())


const initApp = () => {

    //login middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
};
const createServer = () => {
    initApp();
    const server = http.createServer(app);
    server.listen(port);
};



createServer();

exports = {};
