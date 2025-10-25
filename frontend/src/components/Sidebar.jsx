import React from 'react';
import { UserIcon } from './icons/UserIcon.jsx';
import { XIcon } from './icons/XIcon.jsx';
import { InboxIcon } from './icons/InboxIcon.jsx';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon.jsx';
import { TrashIcon } from './icons/TrashIcon.jsx';

const folderIcons = {
    inbox: InboxIcon,
    sent: PaperAirplaneIcon,
    trash: TrashIcon,
};


const Sidebar = ({
  accounts,
  folders,
  selectedAccount,
  setSelectedAccount,
  selectedFolder,
  setSelectedFolder,
  isOpen,
  setIsOpen
}) => {
  const baseClasses = "bg-reach-bg border-r border-reach-border flex flex-col transition-transform duration-300 ease-in-out z-30";
  const responsiveClasses = `fixed inset-y-0 left-0 md:static w-64 md:w-64 lg:w-72 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`;

  const handleFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };
  
  const handleAccountSelect = (accountId) => {
    setSelectedAccount(accountId);
     if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20" onClick={() => setIsOpen(false)}></div>}
      <aside className={`${baseClasses} ${responsiveClasses}`}>
          <div className="flex items-center justify-between p-4 border-b border-reach-border">
            <h1 className="text-xl font-bold text-reach-primary">ReachInbox</h1>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-reach-text-dim hover:text-reach-text">
                <XIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            <div>
                <h2 className="text-xs font-semibold text-reach-text-dim uppercase tracking-wider mb-2">Accounts</h2>
                <ul className="space-y-1">
                    <li>
                        <button onClick={() => handleAccountSelect('all')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedAccount === 'all' ? 'bg-reach-bg-light text-reach-text' : 'text-reach-text-dim hover:bg-reach-bg-light hover:text-reach-text'}`}>
                            <UserIcon className="w-5 h-5" />
                            <span>All Accounts</span>
                        </button>
                    </li>
                    {accounts.map(account => (
                        <li key={account.id}>
                            <button onClick={() => handleAccountSelect(account.id)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedAccount === account.id ? 'bg-reach-bg-light text-reach-text' : 'text-reach-text-dim hover:bg-reach-bg-light hover:text-reach-text'}`}>
                                <UserIcon className="w-5 h-5" />
                                <span>{account.email}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xs font-semibold text-reach-text-dim uppercase tracking-wider mb-2">Folders</h2>
                 <ul className="space-y-1">
                    {folders.map(folder => {
                        const Icon = folderIcons[folder.id] || InboxIcon;
                        return (
                            <li key={folder.id}>
                                <button onClick={() => handleFolderSelect(folder.id)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedFolder === folder.id ? 'bg-reach-bg-light text-reach-text' : 'text-reach-text-dim hover:bg-reach-bg-light hover:text-reach-text'}`}>
                                    <Icon className="w-5 h-5" />
                                    <span>{folder.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
          </nav>
      </aside>
    </>
  );
};

export default Sidebar;
