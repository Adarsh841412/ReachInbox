require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { checkConnection, createIndex } = require('./config/elasticsearch');
const { startSync } = require('./services/imapService');

const app = express();

// Connect Database and Elasticsearch
connectDB();
checkConnection().then(() => {
    createIndex('emails');
});

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/emails', require('./api/emails'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    // Start IMAP Sync
    startSync();
});
