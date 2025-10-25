const axios = require('axios');

const sendSlackNotification = async (email) => {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) return;

  try {
    const message = {
      text: `New "Interested" email received!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New "Interested" lead from:* ${email.from}`,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Subject:*\n${email.subject}` },
          ],
        },
      ],
    };
    await axios.post(slackWebhookUrl, message);
  } catch (error) {
    console.error('Error sending Slack notification:', error.message);
  }
};

const triggerWebhook = async (email) => {
  const webhookUrl = process.env.WEBHOOK_SITE_URL;
  if (!webhookUrl) return;

  try {
    await axios.post(webhookUrl, {
      event: 'email.interested',
      data: email,
    });
  } catch (error) {
    console.error('Error triggering webhook:', error.message);
  }
};

const sendNotification = (email) => {
  sendSlackNotification(email);
  triggerWebhook(email);
};

module.exports = { sendNotification };
