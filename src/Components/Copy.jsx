import { Copy, Check } from 'lucide-react';
import { useState } from 'react';


const CopyText = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);
  
    const handleCopy = async () => {
      await navigator.clipboard.writeText(text);
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

  export default CopyText;