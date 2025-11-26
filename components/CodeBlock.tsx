import React from 'react';
import { CodeSnippet } from '../types';
import { Copy, Check, MessageSquare } from 'lucide-react';

interface CodeBlockProps {
  snippet: CodeSnippet;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPrompt = snippet.language === 'text' || snippet.language === 'prompt';

  return (
    <div className={`my-6 rounded-lg overflow-hidden border ${isPrompt ? 'border-neon-purple/30 bg-[#161622]' : 'border-white/10 bg-[#0d0d14]'} shadow-2xl transition-all hover:border-white/20`}>
      {snippet.caption && (
        <div className={`px-4 py-2 text-xs font-mono border-b flex justify-between items-center ${isPrompt ? 'bg-neon-purple/10 border-neon-purple/20 text-neon-purple' : 'bg-[#1a1a24] border-white/5 text-gray-400'}`}>
          <div className="flex items-center gap-2">
            {isPrompt && <MessageSquare size={12} />}
            <span className="font-bold tracking-wide">{snippet.caption}</span>
          </div>
          <span className="uppercase opacity-50">{isPrompt ? 'PROMPT' : snippet.language}</span>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-opacity opacity-0 group-hover:opacity-100"
          title="Copy"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
        </button>
        <pre className={`p-4 overflow-x-auto text-sm font-mono leading-relaxed ${isPrompt ? 'text-white italic' : ''}`}>
          <code className={isPrompt ? "text-gray-200" : "text-gray-300"}>
            {isPrompt ? (
              // Simple rendering for prompts without line numbers or complex highlighting
              <div className="whitespace-pre-wrap">{snippet.code}</div>
            ) : (
              // Code highlighting
              snippet.code.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell select-none text-gray-700 text-right pr-4 w-8">{i + 1}</span>
                  <span className="table-cell whitespace-pre">
                    {line.split(' ').map((word, wIdx) => {
                      const keywords = ['public', 'private', 'interface', 'class', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 'import', 'package', 'void', 'new'];
                      const annotations = ['@Query', '@Param', '@Test', '@Override', '@Entity', '@Service', '@Controller'];
                      const types = ['String', 'Integer', 'Long', 'List', 'Map', 'Optional', 'BigDecimal', 'LocalDate', 'Page', 'User', 'JpaRepository', 'Collectors'];
                      
                      let className = "text-gray-300";
                      if (keywords.includes(word)) className = "text-neon-purple";
                      else if (annotations.some(a => word.startsWith(a))) className = "text-yellow-400";
                      else if (types.includes(word) || /^[A-Z]/.test(word)) className = "text-neon-cyan";
                      else if (word.includes('"') || word.includes("'")) className = "text-green-400";
                      else if (word.startsWith("//")) return <span key={wIdx} className="text-gray-500 italic">{word} </span>;

                      return <span key={wIdx} className={className}>{word} </span>;
                    })}
                  </span>
                </div>
              ))
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};