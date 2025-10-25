# ReachInbox Onebox - MERN Stack Project

This project is a full-stack email aggregator built with the MERN stack (MongoDB, Express, React, Node.js), Elasticsearch, and Docker. It synchronizes multiple IMAP accounts in real-time, stores emails, provides advanced search, and includes hooks for AI-powered features.

## Features

- **Backend (Node.js/Express)**
  - Real-time email synchronization with IMAP `IDLE` mode.
  - Email storage in MongoDB.
  - Advanced search powered by Elasticsearch.
  - REST API for fetching and searching emails.
  - Placeholder services for AI categorization, Slack notifications, and webhooks.
- **Frontend (React)**
  - A clean dashboard to view emails.
  - Filtering by email account and folder.
  - Search functionality connected to the Elasticsearch backend.
- **DevOps (Docker)**
  - Fully containerized setup with Docker Compose.
  - Services for frontend, backend, MongoDB, and Elasticsearch.
  - Easy one-command startup.

## Project Structure

```
.
├── backend/            # Node.js/Express backend
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/           # React frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml  # Docker orchestration
└── README.md
```

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.
- An IMAP-enabled email account (e.g., Gmail).
  - If using Gmail, you'll need to create an "App Password".
- A Slack Incoming Webhook URL (optional).
- A Webhook.site URL (optional).

## Getting Started

### 1. Configure Environment Variables

Navigate to the `backend` directory and create a `.env` file by copying the example:

```bash
cd backend
cp .env.example .env
```

Now, open `backend/.env` and fill in your credentials.

**CRITICAL: Using Gmail**
If you are using a Gmail account, you **cannot** use your regular password. You must generate a special 16-character **App Password**.
- **How-to Guide:** [Sign in with App Passwords](https://support.google.com/accounts/answer/185833) (This requires 2-Step Verification to be enabled on your Google Account).

**Example `.env` configuration:**
```env
# First IMAP Account
IMAP_USER_1=your-email@gmail.com
IMAP_PASS_1=your16characterapppassword
IMAP_HOST_1=imap.gmail.com
IMAP_PORT_1=993
IMAP_TLS_1=true

# Service URLs (optional)
SLACK_WEBHOOK_URL=
WEBHOOK_SITE_URL=

# These are pre-configured for Docker
MONGO_URI=mongodb://mongodb:27017/reachinbox
ELASTICSEARCH_URL=http://elasticsearch:9200
```

### 2. Build and Run the Application

From the **root directory** of the project, run the following command:

```bash
docker-compose up --build
```

- This command will build the Docker images for the frontend and backend and start all services.
- The first time you run this, it may take several minutes to download the base images for MongoDB and Elasticsearch.

### 3. Accessing the Services

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Elasticsearch**: [http://localhost:9200](http://localhost:9200)

When you first start the application, the backend will begin synchronizing emails from the last 30 days. This may take some time depending on the number of emails. You will see progress logs in your terminal from the `backend` service.
