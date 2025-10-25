// This data is used for UI rendering until a backend endpoint for accounts/folders is created.
// For account filtering to work, the `id` here MUST match an email you configured in the backend .env file.
// For example, if IMAP_USER_1=adarshdubeyv@gmail.com, you must set an id here to that value.
export const mockAccounts = [
    // IMPORTANT: Replace with the email addresses you configured in the backend/.env file
    { id: 'adarshdubeyv@gmail.com', email: 'Gmail Account' },
    // { id: 'second-email@example.com', email: 'Work Account' },
];

export const mockFolders = [
    { id: 'inbox', name: 'Inbox' },
    // Future folders can be added here once supported by the backend
    // { id: 'sent', name: 'Sent' },
    // { id: 'trash', name: 'Trash' },
];
