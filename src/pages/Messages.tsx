import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import {
  Send,
  MessageSquare,
  Search,
  ExternalLink,
  User as UserIcon,
  Sparkles,
  CheckCheck,
} from 'lucide-react';
import { User } from '../types';

export const Messages: React.FC = () => {
  const {
    currentUser,
    users,
    messages,
    sendMessage,
    getConversationMessages,
    getUserConversations,
  } = useApp();

  const [searchParams] = useSearchParams();
  const targetUserIdParam = searchParams.get('userId');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const existingConversations = getUserConversations();

  // Pick target user on mount or parameter change
  useEffect(() => {
    if (targetUserIdParam) {
      const target = users.find((u) => u.id === targetUserIdParam);
      if (target && target.id !== currentUser.id) {
        setSelectedUser(target);
        return;
      }
    }

    // Default to the first conversation if none selected
    if (!selectedUser && existingConversations.length > 0) {
      setSelectedUser(existingConversations[0].otherUser);
    } else if (!selectedUser) {
      // Pick first non-current user
      const firstAvailable = users.find((u) => u.id !== currentUser.id);
      if (firstAvailable) setSelectedUser(firstAvailable);
    }
  }, [targetUserIdParam, currentUser, users, existingConversations.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  const activeMessages = selectedUser ? getConversationMessages(selectedUser.id) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;

    sendMessage(selectedUser.id, inputText.trim());
    setInputText('');
  };

  // Filter conversations / users list
  const filteredUserList = users.filter((u) => {
    if (u.id === currentUser.id) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.headline.toLowerCase().includes(q) ||
      u.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-paper-border">
        <div>
          <span className="font-handwritten text-xl text-cobalt font-bold">
            ★ Direct Campus Comms
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-ink-primary tracking-tight">
            TEAMUP MESSENGER
          </h1>
        </div>
        <div className="text-xs text-ink-secondary bg-[#FFFEFA] px-3 py-1.5 border border-paper-border shadow-xs">
          Signed in as <strong>{currentUser.name}</strong>
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="bg-[#FFFEFA] border border-paper-border shadow-lifted grid grid-cols-1 md:grid-cols-12 min-h-[620px] max-h-[750px] overflow-hidden">
        
        {/* Left Column: Conversations & Users Sidebar */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-paper-border flex flex-col bg-[#FBF9F4]">
          {/* Search Contacts */}
          <div className="p-3 border-b border-paper-border bg-[#FFFEFA]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students or skills..."
                className="w-full pl-9 pr-3 py-2 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-paper-border">
            {filteredUserList.map((user) => {
              const isSelected = selectedUser?.id === user.id;
              const convData = existingConversations.find((c) => c.otherUser.id === user.id);

              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3.5 text-left transition-colors flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-cobalt-light/70 border-l-4 border-cobalt'
                      : 'hover:bg-white'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 object-cover border border-paper-border"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-scrapbook-green border-2 border-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-display font-bold text-xs text-ink-primary truncate">
                        {user.name}
                      </p>
                      {convData?.lastMessage && (
                        <span className="text-[10px] text-ink-muted">
                          {new Date(convData.lastMessage.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-secondary truncate">
                      {convData?.lastMessage?.content || user.headline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col bg-[#FFFEFA]">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-paper-border bg-[#FFFEFA] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${selectedUser.id}`}>
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-10 h-10 object-cover border border-paper-border"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${selectedUser.id}`}
                      className="font-display font-bold text-sm text-ink-primary hover:text-cobalt block leading-snug"
                    >
                      {selectedUser.name}
                    </Link>
                    <p className="text-[11px] text-ink-secondary">
                      {selectedUser.year} • {selectedUser.department.split('&')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/profile/${selectedUser.id}`}
                    className="text-xs text-cobalt font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-paper-bg/40">
                {activeMessages.length === 0 ? (
                  <div className="text-center py-16 space-y-2">
                    <div className="w-10 h-10 bg-cobalt-light text-cobalt rounded-none flex items-center justify-center mx-auto">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="font-display font-bold text-sm text-ink-primary">
                      Start the conversation with {selectedUser.name.split(' ')[0]}
                    </p>
                    <p className="text-xs text-ink-secondary max-w-xs mx-auto">
                      Say hello, discuss project availability, or share an exciting hackathon vision!
                    </p>
                  </div>
                ) : (
                  activeMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3.5 text-xs sm:text-sm leading-relaxed shadow-subtle ${
                            isMe
                              ? 'bg-cobalt text-white rounded-none'
                              : 'bg-[#FFFEFA] text-ink-primary border border-paper-border rounded-none'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className="text-[10px] text-ink-muted mt-1 px-1 flex items-center space-x-1">
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {isMe && <CheckCheck className="w-3 h-3 text-cobalt" />}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Composer */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-paper-border bg-[#FFFEFA] flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a message to ${selectedUser.name.split(' ')[0]}...`}
                  className="flex-1 p-2.5 bg-paper-bg border border-paper-border text-xs sm:text-sm font-medium text-ink-primary outline-none focus:border-cobalt"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-5 py-2.5 bg-cobalt hover:bg-cobalt-hover disabled:opacity-40 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-ink-secondary">
              <p className="text-xs">Select a student from the sidebar to open a conversation.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

