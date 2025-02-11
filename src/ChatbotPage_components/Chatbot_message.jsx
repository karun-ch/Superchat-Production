import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import superchatLogo from "../assets/superchat_logo.webp";
import superchatLogo_white from "../assets/superchat_logo_white.webp";
import { useSelector } from "react-redux";

 const CopyButton = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
      title={isCopied ? "Copied!" : "Copy code"}
    >
      {isCopied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} className="text-gray-300" />
      )}
    </button>
  );
};

const Chatbot_Message = ({ content, type = "text", isLoading }) => {
  const { darkmode } = useSelector((store) => store.user);

  const messageStyles = darkmode
    ? {
        userMessage: "bg-gray-500 text-gray-200",
        botMessage: "bg-[#3A3A3A] text-gray-300",
        systemMessage: "bg-[#2C2C2C] text-gray-400",
        iconColor: "bg-[#3A3A3A]",
      }
    : {
        userMessage: "bg-gray-500 text-gray-200",
        botMessage: "bg-gray-100 text-gray-800",
        systemMessage: "bg-gray-200 text-gray-600",
        iconColor: "bg-gray-200",
      };

  const commonCodeBlockStyles = {
    margin: '1rem 0',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  };

  const lightModeCustomStyle = {
    ...commonCodeBlockStyles,
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  };

  const darkModeCustomStyle = {
    ...commonCodeBlockStyles,
    backgroundColor: '#1e293b',
  };

  const detectLanguage = (className) => {
    const languageMap = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'rb': 'ruby',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'go': 'go',
      'rs': 'rust',
      'swift': 'swift',
      'kt': 'kotlin',
      'r': 'r',
      'sql': 'sql',
      'html': 'html',
      'css': 'css',
      'sh': 'bash',
      'bash': 'bash',
      'yaml': 'yaml',
      'yml': 'yaml',
      'json': 'json',
      'md': 'markdown',
      'xml': 'xml',
      'dockerfile': 'dockerfile',
      'docker': 'dockerfile',
    };

    if (!className) return 'text';
    const match = /language-(\w+)/.exec(className);
    const lang = match ? match[1].toLowerCase() : '';

    return languageMap[lang] || lang || 'text';
  };

  // Separate markdown components for user and bot messages
  const userMarkdownComponents = {
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code
            className={`${darkmode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} px-1 rounded font-mono`}
            {...props}
          >
            {children}
          </code>
        );
      }
      
      // For user messages, render code blocks without syntax highlighting
      return (
        <div className="relative group">
          <pre
            className={`!my-4 !rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words ${
              darkmode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
            }`}
            
          >
            {String(children).replace(/\n$/, '')}
          </pre>
          <CopyButton code={String(children)} />
        </div>
      );
    },
    a: ({ node, children, ...props }) => (
      <a
        className={`${darkmode ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-700'} underline`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ node, children }) => (
      <p className="mb-2 last:mb-0">
        {children}
      </p>
    ),
  };

  const botMarkdownComponents = {
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code
            className={`${darkmode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} px-1 rounded font-mono`}
            {...props}
          >
            {children}

          </code>
        );
      }
      
      const language = detectLanguage(className);

      return (
        <div className="relative group">
          <SyntaxHighlighter
            style={darkmode ? oneDark : coy}
            language={"java"}
            PreTag="div"
            className={`!my-4 !rounded-lg ${darkmode ? '!bg-gray-800' : '!bg-gray-50'}`}
            customStyle={darkmode ? darkModeCustomStyle : lightModeCustomStyle}
            wrapLongLines={true}
            showLineNumbers={true}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
          <CopyButton code={String(children)} />
        </div>
      );
    },
    a: ({ node, children, ...props }) => (
      <a
        className={`${darkmode ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-700'} underline`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ node, children }) => (
      <p className="mb-2 last:mb-0">
        {children}
      </p>
    ),
  };

  return (
    <div
      className={`flex gap-3 mb-4 w-full ${
        type === "system" ? "justify-center" : type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {type !== "system" && type !== "user" && (
        <div
          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${messageStyles.iconColor}`}
        >
          {type === "bot" && isLoading ? (
            <img
              src={darkmode ? superchatLogo_white : superchatLogo}
              alt="Loading"
              className="w-6 h-6 animate-spin bg-transparent"
            />
          ) : (
            <img
              src={darkmode ? superchatLogo_white : superchatLogo}
              alt="Superchat Logo"
              className="w-6 h-6 bg-transparent"
            />
          )}
        </div>
      )}

      <div
        className={`rounded-lg p-3 max-w-[75%] overflow-hidden ${
          type === "system"
            ? messageStyles.systemMessage
            : type === "bot"
            ? messageStyles.botMessage
            : messageStyles.userMessage
        }`}
      >
        {isLoading ? (
          "..."
        ) : (
          <ReactMarkdown
            components={type === "user" ? userMarkdownComponents : botMarkdownComponents}
            className="markdown-content"
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default Chatbot_Message;