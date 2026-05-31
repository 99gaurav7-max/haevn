import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatAlt2, HiOutlineX, HiOutlineSparkles, HiOutlineArrowRight, HiOutlineUser } from 'react-icons/hi';
import { getAIResponse, getCategoryLinks } from '../utils/aiResponses';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetings = [
        "Namaste, sir. I am your HAEVN style concierge. I can guide you to the finest pieces in our collection, recommend ensembles for any occasion, or answer any query about our craftsmanship. How may I assist you today?",
      ];
      setTimeout(() => {
        setMessages([{ text: greetings[0], sender: 'ai' }]);
      }, 600);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 700);
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = input.trim();
    if (!msg || isTyping) return;

    setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const quickActions = [
    { label: 'Dress Shirts', query: 'Tell me about your dress shirts' },
    { label: 'Formal Shoes', query: 'Show me your formal shoes' },
    { label: 'Luxury Watches', query: 'Tell me about your watches' },
    { label: 'Gift Guide', query: 'I need gift suggestions' },
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 gold-gradient rounded-full flex items-center justify-center text-[#0a0a1a] shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-110 transition-all duration-500 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiOutlineChatAlt2 className="text-2xl group-hover:scale-110 transition-transform duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-500/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] bg-warm-100/95 backdrop-blur-2xl border border-gold-500/20 shadow-2xl shadow-navy-500/20 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gold-500/10 bg-gradient-to-r from-gold-500/[0.08] to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
                    <HiOutlineSparkles className="text-lg text-[#0a0a1a]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy-500/90">HAEVN Assistant</h3>
                    <p className="text-[9px] text-gold-500/50 uppercase tracking-[0.2em]">Style Concierge</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-navy-500/30 hover:text-gold-500 transition-colors">
                  <HiOutlineX className="text-lg" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 ${
                      msg.sender === 'user'
                        ? 'bg-gold-500/10 border border-gold-500/20 text-navy-500/90'
                        : 'bg-navy-500/5 border border-navy-500/10 text-navy-500/70'
                    }`}>
                      <p className="text-xs leading-relaxed font-light">{msg.text}</p>
                      {msg.sender === 'ai' && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500/10" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-navy-500/5 border border-navy-500/10 p-4">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gold-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gold-500/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gold-500/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick actions on first message */}
                {messages.length === 1 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => {
                          setMessages(prev => [...prev, { text: action.query, sender: 'user' }]);
                          setIsTyping(true);
                          setTimeout(() => {
                            const response = getAIResponse(action.query);
                            setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
                            setIsTyping(false);
                          }, 1000);
                        }}
                        className="p-3 text-xs text-left text-navy-500/40 border border-navy-500/10 hover:border-gold-500/30 hover:text-gold-500/80 transition-all duration-200 bg-transparent font-light tracking-wide"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-navy-500/8">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about men's fashion..."
                    className="flex-1 px-4 py-2.5 bg-navy-500/5 border border-navy-500/10 text-navy-500/70 text-xs placeholder:text-navy-500/25 focus:outline-none focus:border-gold-500/30 transition-colors font-light"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="px-4 py-2.5 gold-gradient text-[#0a0a1a] disabled:opacity-30 transition-all"
                  >
                    <HiOutlineArrowRight className="text-lg" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
