const express = require('express');
const Email = require('../models/Email');
const { searchEmails } = require('../services/emailService');

const router = express.Router();

// GET /api/emails - Fetch emails with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 50, account, folder } = req.query;
        const query = {};

        if (account && account !== 'all') {
            // In a real multi-account system, you would filter by the account identifier
            // For now, we assume the 'account' param matches the user email
            query.account = account;
        }
        if (folder) {
            query.folder = folder;
        }

        const emails = await Email.find(query)
            .sort({ receivedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Email.countDocuments(query);

        res.json({
            emails,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).send('Server Error');
    }
});

// GET /api/emails/search - Search emails using Elasticsearch
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ msg: 'Search query is required' });
        }
        const results = await searchEmails(q);
        res.json(results);
    } catch (error) {
        console.error('Error searching emails:', error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
