const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const { saveEmail } = require('./emailService');
const { categorizeEmail } = require('./aiService');
const { sendNotification } = require('./notificationService');

const initializeIMAP = (config, accountIdentifier) => {
  const imap = new Imap(config);

  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }
  
  const processEmail = async (msg, seqno) => {
    let buffer = '';
    let attrs;

    msg.on('body', (stream) => {
        stream.on('data', (chunk) => {
            buffer += chunk.toString('utf8');
        });
    });
    msg.on('attributes', (a) => {
        attrs = a;
    });
    msg.on('end', async () => {
        try {
            const parsed = await simpleParser(buffer);
            const category = await categorizeEmail(parsed.subject, parsed.text);

            const emailData = {
                messageId: parsed.messageId,
                account: accountIdentifier,
                from: parsed.from.text,
                to: parsed.to ? parsed.to.text.split(', ') : [],
                subject: parsed.subject,
                body: parsed.text,
                folder: 'inbox',
                receivedAt: parsed.date,
                read: attrs.flags.includes('\\Seen'),
                category,
            };

            await saveEmail(emailData);

            if (category === 'Interested') {
                sendNotification(emailData);
            }
        } catch (error) {
            console.error(`Error processing email ${seqno} for account ${accountIdentifier}:`, error);
        }
    });
  };

  imap.on('ready', () => {
    console.log(`IMAP connection ready for ${accountIdentifier}.`);
    openInbox((err, box) => {
      if (err) throw err;
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      imap.search([['SINCE', thirtyDaysAgo.toISOString().split('T')[0]]], (err, results) => {
        if (err || !results || results.length === 0) {
          console.log(`No recent emails to fetch for ${accountIdentifier}.`);
          listenForNewEmails();
          return;
        }

        const f = imap.fetch(results, { bodies: '' });
        f.on('message', processEmail);
        f.on('error', (err) => {
          console.log(`Fetch error for ${accountIdentifier}: ` + err);
        });
        f.on('end', () => {
          console.log(`Done fetching all recent messages for ${accountIdentifier}!`);
          listenForNewEmails();
        });
      });
    });
  });

  const listenForNewEmails = () => {
     imap.on('mail', () => {
        console.log(`New mail received for ${accountIdentifier}. Fetching...`);
        openInbox((err, box) => {
            if (err) throw err;
            // Fetch the newest message
            const fetch = imap.fetch(box.messages.total + ':*', { bodies: '' });
            fetch.on('message', processEmail);
            fetch.on('error', (err) => console.log('Fetch error on new mail:', err));
            fetch.on('end', () => console.log('Done fetching new mail.'));
        });
      });
  }

  imap.on('error', (err) => {
    console.log(`IMAP error for ${accountIdentifier}:`, err.message);
  });

  imap.on('end', () => {
    console.log(`IMAP connection ended for ${accountIdentifier}.`);
  });

  imap.connect();
};

const startSync = () => {
    const accountsToSync = [];
    if (process.env.IMAP_USER_1 && process.env.IMAP_PASS_1) {
        accountsToSync.push({
            user: process.env.IMAP_USER_1,
            password: process.env.IMAP_PASS_1,
            host: process.env.IMAP_HOST_1,
            port: process.env.IMAP_PORT_1,
            tls: process.env.IMAP_TLS_1 === 'true',
        });
    }
    if (process.env.IMAP_USER_2 && process.env.IMAP_PASS_2) {
         accountsToSync.push({
            user: process.env.IMAP_USER_2,
            password: process.env.IMAP_PASS_2,
            host: process.env.IMAP_HOST_2,
            port: process.env.IMAP_PORT_2,
            tls: process.env.IMAP_TLS_2 === 'true',
        });
    }

    if(accountsToSync.length === 0) {
        console.warn("No IMAP accounts configured. Email sync will not start.");
        return;
    }

    accountsToSync.forEach(config => {
        console.log(`Initializing IMAP sync for ${config.user}`);
        initializeIMAP(config, config.user);
    });
};

module.exports = { startSync };
