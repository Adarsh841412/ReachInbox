import { AICategory } from '../types.js';

export const accounts = [
    { id: 'acc1', email: 'personal@example.com' },
    { id: 'acc2', email: 'work@example.com' },
];

export const folders = [
    { id: 'inbox', name: 'Inbox' },
    { id: 'sent', name: 'Sent' },
    { id: 'trash', name: 'Trash' },
];

export const emails = [
    {
        id: '1', accountId: 'acc1', from: 'Mitrajit', to: ['personal@example.com'], subject: 'Re: Project Alpha Update',
        body: 'Hi, Thanks for the update. Looks great! Let\'s sync tomorrow at 10 AM. Best, Mitrajit', date: '2024-07-30T10:00:00Z', read: false, folder: 'inbox', category: AICategory.Interested,
    },
    {
        id: '2', accountId: 'acc2', from: 'Sarvagya', to: ['work@example.com'], subject: 'Meeting Confirmation: Technical Interview',
        body: 'Hi, Your resume has been shortlisted. This email is to confirm your technical interview tomorrow at 2 PM. Please find the meeting link attached. Regards, Sarvagya', date: '2024-07-30T09:30:00Z', read: false, folder: 'inbox', category: AICategory.MeetingBooked,
    },
    {
        id: '3', accountId: 'acc1', from: 'LinkedIn', to: ['personal@example.com'], subject: 'You have a new connection suggestion',
        body: 'You have a new connection suggestion from a mutual contact. Connect now to grow your network.', date: '2024-07-30T08:00:00Z', read: true, folder: 'inbox', category: AICategory.Spam,
    },
    {
        id: '4', accountId: 'acc2', from: 'Jane Doe', to: ['work@example.com'], subject: 'Out of Office: Annual Leave',
        body: 'Thank you for your email. I am currently out of office on annual leave and will return on August 5th. I will respond to your message upon my return. For urgent matters, please contact my colleague John Smith.', date: '2024-07-29T15:12:00Z', read: true, folder: 'inbox', category: AICategory.OutOfOffice,
    },
    {
        id: '5', accountId: 'acc1', from: 'personal@example.com', to: ['recruiter@awesome.co'], subject: 'Application for Backend Engineer',
        body: 'Dear Hiring Manager, I am writing to apply for the Backend Engineer position advertised on your careers page. Please find my resume attached. Thank you for your time and consideration. Sincerely, Alex', date: '2024-07-28T11:00:00Z', read: true, folder: 'sent', category: AICategory.None,
    },
     {
        id: '6', accountId: 'acc2', from: 'Old Project Lead', to: ['work@example.com'], subject: 'FW: Deprecated Project Files',
        body: 'These are the files from the old project. Please archive them. Thanks', date: '2024-06-25T18:00:00Z', read: true, folder: 'trash', category: AICategory.None,
    },
];
