import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Phone, Video, Info } from 'lucide-react';

const INITIAL_CONTACTS = [
  {
    id: 'steve',
    name: 'Steve Jobs',
    avatar: 'SJ',
    avatarColor: 'from-amber-500 to-orange-600',
    status: 'Stay hungry, stay foolish.',
    messages: [
      { id: 1, role: 'contact', text: 'Design is not just what it looks like and feels like. Design is how it works.', time: '10:14 AM' },
      { id: 2, role: 'user', text: 'We built macOS Golden Gate in React with liquid glass ribbons and zero dead clicks!', time: '10:15 AM' },
      { id: 3, role: 'contact', text: 'Insanely great! Keep pushing simplicity and craftsmanship.', time: '10:16 AM' },
    ],
  },
  {
    id: 'craig',
    name: 'Craig Federighi',
    avatar: 'CF',
    avatarColor: 'from-blue-600 to-indigo-600',
    status: 'Hair force one.',
    messages: [
      { id: 1, role: 'contact', text: 'How is the 8-way resize math performing on Retina displays?', time: 'Yesterday' },
      { id: 2, role: 'user', text: 'Flawless 60 FPS using PointerEvents and GPU translate transforms.', time: 'Yesterday' },
    ],
  },
  {
    id: 'sarah',
    name: 'Sarah Connor',
    avatar: 'SC',
    avatarColor: 'from-emerald-500 to-teal-600',
    status: 'No fate but what we make.',
    messages: [
      { id: 1, role: 'contact', text: 'Did you make sure Gemini AI operates safely within the simulator?', time: 'Oct 2' },
      { id: 2, role: 'user', text: 'Yes, fully localized with strict client sandboxing.', time: 'Oct 2' },
    ],
  },
];

export default function MessagesApp() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState('steve');
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeContact.messages, isTyping]);

  const handleSendMessage = (text = inputVal) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setContacts((prev) =>
      prev.map((c) => (c.id === activeContact.id ? { ...c, messages: [...c.messages, newMsg] } : c))
    );
    setInputVal('');
    setIsTyping(true);

    // Auto reply simulation
    setTimeout(() => {
      let replyText = 'That sounds fantastic! Keep up the brilliant work.';
      const lower = trimmed.toLowerCase();
      if (lower.includes('hello') || lower.includes('hi')) replyText = `Hello! Hope you are enjoying macOS Golden Gate.`;
      else if (lower.includes('apple') || lower.includes('mac')) replyText = `The integration feels completely native. Great job!`;
      else if (lower.includes('great') || lower.includes('cool')) replyText = `Appreciate the dedication to smooth 60 FPS animation!`;

      const botMsg = {
        id: Date.now() + 1,
        role: 'contact',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setContacts((prev) =>
        prev.map((c) => (c.id === activeContact.id ? { ...c, messages: [...c.messages, botMsg] } : c))
      );
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex-1 flex h-full bg-white dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Sidebar Contacts List */}
      <aside className="w-56 sm:w-64 bg-slate-50/90 dark:bg-white/[0.03] border-r border-black/10 dark:border-white/10 flex flex-col flex-shrink-0">
        <div className="h-11 px-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="font-semibold text-xs text-slate-500 dark:text-slate-400">Messages</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {contacts.map((contact) => {
            const isActive = contact.id === activeContact.id;
            const lastMsg = contact.messages[contact.messages.length - 1];

            return (
              <div
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`flex items-center space-x-3 p-2 rounded-xl cursor-pointer transition select-none ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${contact.avatarColor} text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm`}
                >
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate leading-tight">
                      {contact.name}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isActive ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      {lastMsg?.time || ''}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {lastMsg?.text || contact.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Chat Thread */}
      <main className="flex-1 flex flex-col h-full bg-white dark:bg-[#1E1E1E] overflow-hidden select-text">
        {/* Contact Top Header */}
        <div className="h-11 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
              {activeContact.name}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">• {activeContact.status}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-500">
            <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition">
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition">
              <Video className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeContact.messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-sm shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                  }`}
                >
                  <div>{m.text}</div>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      isUser ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl px-3 py-2 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Emoji Bar & Input */}
        <div className="p-3 border-t border-black/10 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5 mb-2">
            {['👍', '❤️', '🔥', '👏', '🚀'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendMessage(emoji)}
                className="text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition"
              >
                {emoji}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="iMessage"
              className="w-full py-2 pl-3 pr-10 rounded-full bg-black/5 dark:bg-white/10 border border-transparent focus:border-blue-500 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="absolute right-1.5 p-1 rounded-full bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white transition active:scale-95 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
