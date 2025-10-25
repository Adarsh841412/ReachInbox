import React from 'react';
import { AICategory } from '../types.js';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon.jsx';
import { ReplyIcon } from './icons/ReplyIcon.jsx';
import { SparklesIcon } from './icons/SparklesIcon.jsx';


const categoryStyles = {
    [AICategory.Interested]: 'bg-green-500/10 text-green-400 border-green-500/20',
    [AICategory.MeetingBooked]: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    [AICategory.NotInterested]: 'bg-red-500/10 text-red-400 border-red-500/20',
    [AICategory.Spam]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    [AICategory.OutOfOffice]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    [AICategory.None]: 'hidden',
};

const EmailDetail = ({ email, onBack }) => {
    if (!email) {
        return (
            <div className="hidden md:flex items-center justify-center h-full text-reach-text-dim">
                <p>Select an email to read</p>
            </div>
        );
    }

    const categoryStyle = categoryStyles[email.category] || categoryStyles[AICategory.None];
    const toRecipients = Array.isArray(email.to) ? email.to.join(', ') : email.to;


    return (
        <article className="h-full flex flex-col p-4 sm:p-6 bg-reach-dark">
             <div className="flex items-center mb-4 flex-shrink-0">
                 <button onClick={onBack} className="md:hidden p-2 -ml-2 mr-2 text-reach-text-dim hover:text-reach-text">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl lg:text-2xl font-bold text-reach-text truncate flex-1">{email.subject}</h2>
            </div>
            
            <div className="flex items-start justify-between pb-4 border-b border-reach-border flex-shrink-0">
                <div className="flex items-center min-w-0">
                    <div className="w-10 h-10 rounded-full bg-reach-primary flex-shrink-0 flex items-center justify-center font-bold text-reach-dark mr-4">
                        {email.from.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-reach-text truncate">{email.from}</p>
                        <p className="text-sm text-reach-text-dim truncate">To: {toRecipients}</p>
                    </div>
                </div>
                 <div className="text-right flex-shrink-0 ml-4">
                    <time className="text-sm text-reach-text-dim whitespace-nowrap">
                        {new Date(email.receivedAt).toLocaleString()}
                    </time>
                    {email.category && email.category !== AICategory.None && (
                        <div className={`mt-2 inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryStyle}`}>
                            {email.category}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 py-6 text-reach-text leading-relaxed whitespace-pre-wrap overflow-y-auto">
                {email.body}
            </div>
            
            <div className="pt-4 mt-auto border-t border-reach-border flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-md bg-reach-bg-light hover:bg-reach-primary hover:text-reach-dark font-semibold transition-colors">
                    <ReplyIcon className="w-5 h-5" />
                    Reply
                </button>
                 <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-md bg-reach-primary/80 text-reach-dark font-semibold hover:bg-reach-primary transition-colors">
                    <SparklesIcon className="w-5 h-5" />
                    Suggest Reply (AI)
                </button>
            </div>
        </article>
    );
};

export default EmailDetail;
