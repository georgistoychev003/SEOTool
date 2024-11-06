import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onAnalyze, isLoading }: Props) {
  const [url, setUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     placeholder:text-gray-400 text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium 
                   rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                   hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}