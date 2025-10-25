import { emails, accounts, folders } from './mockData.js';

export const mockEmailService = {
  getEmails: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ emails, accounts, folders });
      }, 500); // Simulate network delay
    });
  },
};
