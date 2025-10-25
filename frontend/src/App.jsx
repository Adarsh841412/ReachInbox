import React, { useState, useEffect, useCallback } from 'react';
import { emailService } from './services/emailService.js';
import Sidebar from './components/Sidebar.jsx';
import EmailList from './components/EmailList.jsx';
import EmailDetail from './components/EmailDetail.jsx';
import Header from './components/Header.jsx';
import { mockAccounts, mockFolders } from './services/mockData.js';


const App = () => {
  const [emails, setEmails] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Using mock accounts and folders for UI display until backend provides them
  useEffect(() => {
    // In a real app, you would fetch these from the backend
    // For now, update the mockData.js file with your IMAP account emails
    setAccounts(mockAccounts); 
    setFolders(mockFolders);
  }, []);

  const fetchEmails = useCallback(async () => {
    setIsLoading(true);
    try {
      let data;
      if(searchTerm) {
        data = await emailService.searchEmails(searchTerm);
        setEmails(data);
        if (data.length > 0) {
            setSelectedEmail(data[0]);
        } else {
            setSelectedEmail(null);
        }
      } else {
        const response = await emailService.getEmails({ account: selectedAccount, folder: selectedFolder });
        setEmails(response.emails);
        if (response.emails.length > 0) {
            setSelectedEmail(response.emails[0]);
        } else {
            setSelectedEmail(null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch emails:", error);
      setEmails([]);
      setSelectedEmail(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccount, selectedFolder, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchEmails();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchEmails]);


  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full antialiased bg-reach-dark text-reach-text overflow-hidden">
      <Sidebar
        accounts={accounts}
        folders={folders}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 flex overflow-hidden">
          <div className={`w-full md:w-2/5 xl:w-1/3 border-r border-reach-border overflow-y-auto transition-all duration-300 ${selectedEmail && 'hidden md:block'}`}>
            <EmailList
              emails={emails}
              onSelectEmail={handleSelectEmail}
              selectedEmailId={selectedEmail?._id}
              isLoading={isLoading}
            />
          </div>
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${!selectedEmail && 'hidden md:block'}`}>
            <EmailDetail email={selectedEmail} onBack={() => setSelectedEmail(null)} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
