const Email = require('../models/Email');
const { client } = require('../config/elasticsearch');

const INDEX_NAME = 'emails';

/**
 * Saves a single email to MongoDB and indexes it in Elasticsearch.
 * @param {object} emailData The email data to save.
 */
const saveEmail = async (emailData) => {
  try {
    // Check if email with this messageId already exists to prevent duplicates
    const existingEmail = await Email.findOne({ messageId: emailData.messageId });
    if (existingEmail) {
      return;
    }

    const email = new Email(emailData);
    const savedEmail = await email.save();
    
    // Index in Elasticsearch
    await client.index({
      index: INDEX_NAME,
      id: savedEmail._id.toString(),
      body: {
        from: savedEmail.from,
        to: savedEmail.to,
        subject: savedEmail.subject,
        body: savedEmail.body,
        receivedAt: savedEmail.receivedAt,
        account: savedEmail.account,
        folder: savedEmail.folder,
        category: savedEmail.category,
      },
    });
  } catch (error) {
    if (error.code === 11000) { // Mongoose duplicate key error
        // This is an expected race condition, can be ignored.
    } else {
        console.error('Error saving or indexing email:', error);
    }
  }
};

/**
 * Searches emails in Elasticsearch.
 * @param {string} query The search query.
 * @returns {Promise<Array>} An array of email objects.
 */
const searchEmails = async (query) => {
    const { body } = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['subject', 'from', 'body'],
                    fuzziness: 'AUTO',
                },
            },
        },
    });

    return body.hits.hits.map(hit => ({ ...hit._source, _id: hit._id }));
};


module.exports = { saveEmail, searchEmails };
