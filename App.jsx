import React, { useState, useEffect, useMemo } from 'react';
import { mockEmailService } from './services/mockEmailService.js';
import Sidebar from './components/Sidebar.jsx';
import EmailList from './components/EmailList.jsx';
import EmailDetail from './components/EmailDetail.jsx';
import Header from './components/Header.jsx';

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await mockEmailService.getEmails();
        setEmails(data.emails);
        setAccounts(data.accounts);
        setFolders(data.folders);
        if (data.emails.length > 0) {
            const initialEmail = data.emails.find(e => e.folder === 'inbox');
            setSelectedEmail(initialEmail || data.emails[0]);
        }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredEmails = useMemo(() => {
    return emails
      .filter(email => selectedAccount === 'all' || email.accountId === selectedAccount)
      .filter(email => email.folder === selectedFolder)
      .filter(email => 
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [emails, selectedAccount, selectedFolder, searchTerm]);

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
              emails={filteredEmails}
              onSelectEmail={handleSelectEmail}
              selectedEmailId={selectedEmail?.id}
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