import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Cpu, Sparkles, MessageSquare, ExternalLink, Download, Bookmark } from 'lucide-react';
import { BOOK_PAGES, AUTHOR_NAME, PDF_DOWNLOAD_LINK } from './constants';
import { PageType } from './types';
import { Chat } from './components/Chat';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const CodeBlock: React.FC<{ snippet: { language: string; code: string } }> = ({ snippet }) => (
  <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
    <pre><code>{snippet.code}</code></pre>
  </div>
);

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const currentPage = BOOK_PAGES[currentPageIndex];
  const totalPages = BOOK_PAGES.length;

  const goToPage = (index: number) => {
    if (index >= 0 && index < totalPages) {
      setCurrentPageIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <ErrorBoundary>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <main className="container mx-auto px-4 py-8">
            {renderContent()}
        </main>
        
        {/* Navigation */}
        <nav className="sticky bottom-0 bg-gray-900/50 backdrop-blur-md border-t border-white/10">
          <div className="max-w-4xl mx-auto flex justify-between items-center h-16 px-4">
            <button 
              onClick={() => goToPage(currentPageIndex - 1)} 
              disabled={currentPageIndex === 0}
              className="disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-2"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <BookOpen size={20} className="text-gray-500" />
              <span className="font-mono text-sm text-gray-400">
                Page {currentPageIndex + 1} of {totalPages}
              </span>
            </div>
            <button 
              onClick={() => goToPage(currentPageIndex + 1)} 
              disabled={currentPageIndex === totalPages - 1}
              className="disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-2"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </nav>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-20 right-4 space-y-3">
          <a
            href={PDF_DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center bg-gray-800 border border-white/10 rounded-full text-white hover:bg-neon-purple/20 hover:border-neon-purple transition-all shadow-lg"
            title="Download PDF"
          >
            <Download size={24} />
          </a>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 flex items-center justify-center bg-neon-cyan text-gray-900 rounded-full hover:bg-neon-cyan/80 transition-colors shadow-lg animate-pulse"
            title="Open AI Chat"
          >
            <MessageSquare size={24} />
          </button>
        </div>

        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ErrorBoundary>
  );
};

export default App;