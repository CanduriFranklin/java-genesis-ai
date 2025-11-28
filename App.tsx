import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Cpu, Sparkles, Send, MessageSquare, ExternalLink, Bookmark, Download } from 'lucide-react';
import { BOOK_PAGES, AUTHOR_NAME, PDF_DOWNLOAD_LINK } from './constants';
import { PageType, ChatMessage } from './types';
import { CodeBlock } from './components/CodeBlock';
import { chatWithBook } from './services/geminiService';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings, Architect. I am the Java Genesis AI Companion. Ask me anything about the manuscript." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentPage = BOOK_PAGES[currentPageIndex];
  const totalPages = BOOK_PAGES.length;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const goToPage = (index: number) => {
    if (index >= 0 && index < totalPages) {
      setDirection(index > currentPageIndex ? 'right' : 'left');
      setCurrentPageIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isThinking) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    const response = await chatWithBook(userMsg);
    
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsThinking(false);
  };

  const renderContent = () => {
    const isCover = currentPage.type === PageType.COVER;
    const isClosing = currentPage.type === PageType.CLOSING;

    return (
      <div className={`max-w-4xl mx-auto min-h-[80vh] flex flex-col ${isCover ? 'justify-center items-center text-center' : 'justify-start'}`}>
        
        {/* Cover Page Special Layout */}
        {isCover && (
          <div className="animate-fade-in-up space-y-8 py-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple to-neon-cyan rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
              <img 
                src={currentPage.imageUrl || "https://picsum.photos/600/600?grayscale&blur=2"} 
                alt="Cover" 
                className="relative z-10 w-full h-full object-cover rounded-2xl border-2 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Cpu size={80} className="text-white drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 drop-shadow-sm">
              {currentPage.title}
            </h1>
            <h2 className="text-xl md:text-3xl font-mono text-neon-cyan tracking-widest uppercase mb-8">
              {currentPage.subtitle}
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto leading-relaxed border-t border-white/10 pt-6">
              {currentPage.content[0]}
            </p>
            
            {/* Cover Links */}
            {currentPage.links && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                 {currentPage.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-xs font-mono border border-white/10 rounded-full hover:bg-white/10 hover:border-neon-cyan text-gray-400 hover:text-white transition-all"
                    >
                      <ExternalLink size={12} className="mr-2" />
                      {link.title}
                    </a>
                 ))}
              </div>
            )}

            <div className="mt-12">
               <span className="text-sm font-mono text-neon-purple">AUTHOR</span>
               <p className="text-xl font-bold text-white">{AUTHOR_NAME}</p>
            </div>
             <button 
              onClick={() => goToPage(1)}
              className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neon-cyan hover:text-black transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              INITIALIZE PROTOCOL
            </button>
          </div>
        )}

        {/* Content Pages */}
        {!isCover && (
          <div key={currentPage.id} className="animate-fade-in w-full py-8 md:py-12 px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8 border-b border-white/10 pb-4">
              <span className="text-neon-purple font-mono text-xl">0{currentPage.id}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{currentPage.title.replace(/^\d+\.\s/, '')}</h2>
            </div>
            
            {/* Page Header Image */}
            {currentPage.imageUrl && (
              <div className="w-full h-48 md:h-64 mb-8 overflow-hidden rounded-xl border border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img 
                  src={currentPage.imageUrl} 
                  alt="Chapter Visual" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                />
              </div>
            )}

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
              {currentPage.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Bullet Points */}
            {currentPage.bulletPoints && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                {currentPage.bulletPoints.map((point, idx) => {
                  const parts = point.split('**');
                  const bold = parts[1];
                  const rest = parts[2] || parts[0];
                  
                  return (
                    <div key={idx} className="glass-panel p-5 rounded-xl border-l-2 border-l-neon-purple hover:border-l-neon-cyan hover:bg-white/5 transition-all group">
                      <div className="flex items-start">
                        <Sparkles className="text-neon-purple mt-1 mr-3 flex-shrink-0 group-hover:text-neon-cyan transition-colors" size={18} />
                        <div>
                          {bold && <h4 className="text-white font-bold mb-1">{bold}</h4>}
                          <p className="text-sm text-gray-400 leading-relaxed">{rest}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Code Snippets */}
            {currentPage.codeSnippets && (
              <div className="my-8 space-y-6">
                {currentPage.codeSnippets.map((snippet, idx) => (
                  <CodeBlock key={idx} snippet={snippet} />
                ))}
              </div>
            )}
            
            {/* Official Resources / Knowledge Base */}
            {currentPage.links && (
              <div className="my-10 border-t border-white/10 pt-6">
                <h3 className="flex items-center text-neon-cyan font-mono text-sm tracking-widest mb-4">
                  <Bookmark size={14} className="mr-2" />
                  KNOWLEDGE BASE
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPage.links.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                           link.type === 'DOCS' ? 'bg-blue-900/50 text-blue-200' : 
                           link.type === 'TOOL' ? 'bg-purple-900/50 text-purple-200' : 
                           'bg-gray-700 text-gray-200'
                         }`}>
                           {link.type}
                         </span>
                         <span className="text-sm text-gray-300 font-medium group-hover:text-white">{link.title}</span>
                      </div>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-neon-cyan transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action / Closing */}
            {currentPage.cta && (
              <div className={`mt-12 p-8 rounded-2xl border ${isClosing ? 'bg-gradient-to-br from-neon-purple/20 to-blue-900/20 border-neon-purple/50' : 'bg-white/5 border-white/10'}`}>
                <p className="text-xl md:text-2xl font-bold text-center italic text-white">
                  "{currentPage.cta}"
                </p>
                {isClosing && (
                  <div className="mt-8 text-center text-gray-400">
                     <p className="text-sm uppercase tracking-widest mb-2">Written & Developed By</p>
                     <p className="text-neon-cyan font-mono text-lg">{AUTHOR_NAME}</p>
                     <p className="text-xs mt-2 text-gray-500">Expert in Software Development & Emerging Technologies</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-200 font-sans selection:bg-neon-purple selection:text-white overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[128px]"></div>
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-neon-cyan/5 rounded-full blur-[100px] transform -translate-x-1/2"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-neon-cyan" size={20} />
            <span className="font-bold text-white tracking-wider text-sm hidden sm:inline">JAVA GENESIS AI</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="text-xs font-mono text-gray-500">
               PAGE {currentPageIndex + 1} / {totalPages}
             </div>
             <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-2 rounded-full transition-all ${isChatOpen ? 'bg-neon-cyan text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
                <MessageSquare size={18} />
             </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow pt-20 pb-24 px-4 sm:px-8 overflow-y-auto scrollbar-hide">
           {renderContent()}
        </main>

        {/* PDF Download Floating Widget */}
        <a 
          href={PDF_DOWNLOAD_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 left-6 z-40 group"
        >
           <div className="relative flex items-center">
             {/* Glow Effect */}
             <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             {/* Card Container */}
             <div className="relative bg-[#13131f]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pr-5 flex items-center gap-4 shadow-2xl transform transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neon-cyan/50">
                
                {/* Book Thumbnail */}
                <div className="w-12 h-16 rounded-lg overflow-hidden relative shadow-lg border border-white/10 group-hover:shadow-neon-cyan/20 transition-all">
                  <img 
                    src={BOOK_PAGES[0].imageUrl} 
                    alt="E-Book Cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>

                {/* Text Action */}
                <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-0.5">Free E-Book</span>
                   <div className="flex items-center space-x-2 text-white font-bold text-sm group-hover:text-neon-cyan transition-colors">
                      <span>Download PDF</span>
                      <Download size={14} className="group-hover:animate-bounce" />
                   </div>
                </div>
             </div>
           </div>
        </a>

        {/* Navigation Footer */}
        <footer className="fixed bottom-0 w-full glass-panel py-4 px-8 flex justify-between items-center z-40">
          <button 
            onClick={() => goToPage(currentPageIndex - 1)}
            disabled={currentPageIndex === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentPageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-neon-cyan'
            }`}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline font-mono text-sm">PREVIOUS</span>
          </button>

          {/* Progress Bar */}
          <div className="flex space-x-2">
            {BOOK_PAGES.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentPageIndex ? 'w-8 bg-neon-cyan shadow-[0_0_10px_#00f3ff]' : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={() => goToPage(currentPageIndex + 1)}
            disabled={currentPageIndex === totalPages - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              currentPageIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-neon-cyan'
            }`}
          >
            <span className="hidden sm:inline font-mono text-sm">NEXT</span>
            <ChevronRight size={20} />
          </button>
        </footer>

        {/* AI Chat Drawer */}
        <div 
          className={`fixed top-20 right-0 w-full md:w-96 h-[calc(100vh-140px)] glass-panel border-l border-white/10 transform transition-transform duration-300 z-40 flex flex-col ${
            isChatOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-white/10 bg-black/40">
            <h3 className="font-mono text-neon-cyan text-sm flex items-center">
              <Sparkles size={14} className="mr-2" />
              AI COMPANION
            </h3>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-neon-blue/20 text-white border border-neon-blue/30 rounded-tr-none' 
                    : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                 </div>
               </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Java or AI..."
                className="w-full bg-black/50 border border-white/20 rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-neon-cyan text-white placeholder-gray-600"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isThinking}
                className="absolute right-2 top-2 p-1 text-neon-cyan hover:text-white disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default App;