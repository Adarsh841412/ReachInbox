const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

const checkConnection = async () => {
    try {
        await client.ping();
        console.log("Elasticsearch is connected");
    } catch (error) {
        console.error("Elasticsearch connection failed:", error);
        process.exit(1);
    }
}

const createIndex = async (indexName) => {
    try {
        const { body: indexExists } = await client.indices.exists({ index: indexName });
        if (!indexExists) {
            await client.indices.create({ index: indexName });
            console.log(`Index "${indexName}" created.`);
        }
    } catch (error) {
        console.error(`Error creating index "${indexName}":`, error);
    }
}

module.exports = { client, checkConnection, createIndex };
