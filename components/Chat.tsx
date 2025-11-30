import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, X, Loader } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithBook } from '../services/geminiService';
import { CodeBlock } from './CodeBlock';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings, Architect. I am the Java Genesis AI Companion. Ask me anything about the manuscript." }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      const response = await chatWithBook(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error("Error chatting with book:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-lg z-50 animate-fade-in-up">
      <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[70vh]">
        <header className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center">
            <MessageSquare size={18} className="text-neon-cyan mr-3" />
            <h2 className="text-lg font-bold text-white">Java Genesis AI</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg: ChatMessage, index: number) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-neon-purple/20 text-white' : 'bg-gray-800 text-gray-300'}`}>
                <CodeBlock text={msg.text} />
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-md p-3 rounded-xl bg-gray-800 text-gray-300">
                <Loader className="animate-spin" size={20} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <footer className="p-4 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the manuscript..."
              className="flex-1 bg-gray-800/50 border border-white/10 rounded-full py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            />
            <button
              type="submit"
              disabled={isThinking}
              className="ml-3 p-2 bg-neon-cyan rounded-full text-gray-900 hover:bg-neon-cyan/80 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
