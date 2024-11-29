import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  avatar?: string;
}

// Sample data - replace with actual data source
const conversations: Conversation[] = [
  {
    id: '1',
    participant: 'John Smith',
    lastMessage: 'Looking forward to our appointment tomorrow!',
    lastMessageTime: new Date(),
    unreadCount: 2,
  },
  {
    id: '2',
    participant: 'Sarah Johnson',
    lastMessage: 'Thanks for the consultation',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 0,
  },
];

const messages: Message[] = [
  {
    id: '1',
    sender: 'John Smith',
    content: 'Hi, I have a question about my upcoming appointment.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Of course! How can I help you?',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
  },
  {
    id: '3',
    sender: 'John Smith',
    content: 'Looking forward to our appointment tomorrow!',
    timestamp: new Date(),
    isRead: false,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add message handling logic here
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 dark:border-dark-border">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border focus:ring-2 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {conversations.map((conversation) => (
            <motion.button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              className={`w-full p-4 flex items-center space-x-4 border-b border-gray-200 dark:border-dark-border ${
                selectedConversation === conversation.id
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : ''
              }`}
            >
              <div className="relative">
                {conversation.avatar ? (
                  <img
                    src={conversation.avatar}
                    alt={conversation.participant}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                      {conversation.participant[0]}
                    </span>
                  </div>
                )}
                {conversation.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">
                    {conversation.participant}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-dark-muted">
                    {format(conversation.lastMessageTime, 'h:mm a')}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-dark-muted truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    J
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text">
                    John Smith
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">
                    Online
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'You'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-accent text-gray-900 dark:text-dark-text'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'You'
                      ? 'text-blue-100'
                      : 'text-gray-500 dark:text-dark-muted'
                  }`}>
                    {format(message.timestamp, 'h:mm a')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-dark-border">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Send className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text">
              Select a conversation
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}