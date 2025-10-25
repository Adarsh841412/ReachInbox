import React from 'react';

const EmailPreview = ({ email, onSelect, isSelected }) => {
    const baseClasses = "block w-full text-left p-4 border-b border-reach-border cursor-pointer transition-colors duration-150";
    const selectedClasses = "bg-reach-bg-light";
    const unselectedClasses = "hover:bg-reach-bg-light/50";

    const handleClick = () => {
        onSelect(email);
    };

    return (
        <li>
            <button
                type="button"
                onClick={handleClick}
                className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                aria-pressed={isSelected}
            >
                <div className="flex justify-between items-start">
                    <h3 className={`text-sm font-semibold truncate ${email.read ? 'text-reach-text-dim' : 'text-reach-text'}`}>{email.from}</h3>
                    <time className="text-xs text-reach-text-dim flex-shrink-0 ml-2">
                        {new Date(email.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                </div>
                <p className={`text-sm truncate mt-1 ${email.read ? 'text-reach-text-dim' : 'text-reach-text'}`}>{email.subject}</p>
                <p className="text-xs text-reach-text-dim mt-1 line-clamp-2">{email.body}</p>
            </button>
        </li>
    );
};

const EmailList = ({ emails, onSelectEmail, selectedEmailId, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 border-b border-reach-border">
            <div className="flex justify-between items-start">
                <div className="h-4 bg-reach-bg-light rounded w-1/3"></div>
                <div className="h-3 bg-reach-bg-light rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-reach-bg-light rounded w-3/4 mt-2"></div>
            <div className="h-3 bg-reach-bg-light rounded w-full mt-2"></div>
             <div className="h-3 bg-reach-bg-light rounded w-1/2 mt-1"></div>
          </div>
        ))}
      </div>
    );
  }

  if (emails.length === 0) {
    return <div className="p-4 text-center text-reach-text-dim">No emails found.</div>;
  }

  return (
    <ul>
      {emails.map(email => (
        <EmailPreview
          key={email._id}
          email={email}
          onSelect={onSelectEmail}
          isSelected={selectedEmailId === email._id}
        />
      ))}
    </ul>
  );
};

export default EmailList;
