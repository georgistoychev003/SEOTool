import React from 'react';
import { Plus, X, History } from 'lucide-react';

interface Props {
  onAnalyze: (url: string) => void;
}

export function CompetitorUrls({ onAnalyze }: Props) {
  const [competitors, setCompetitors] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('competitorUrls');
    return saved ? JSON.parse(saved) : [];
  });
  const [newUrl, setNewUrl] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl && !competitors.includes(newUrl)) {
      const updatedCompetitors = [...competitors, newUrl];
      setCompetitors(updatedCompetitors);
      localStorage.setItem('competitorUrls', JSON.stringify(updatedCompetitors));
      setNewUrl('');
      setIsAdding(false);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const updatedCompetitors = competitors.filter(url => url !== urlToRemove);
    setCompetitors(updatedCompetitors);
    localStorage.setItem('competitorUrls', JSON.stringify(updatedCompetitors));
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Saved Competitors</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg
                   text-white bg-gradient-to-r from-blue-600 to-indigo-600
                   hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Competitor
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter competitor URL"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                       transition-colors duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300
                       transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {competitors.length > 0 ? (
        <div className="space-y-2">
          {competitors.map((url) => (
            <div
              key={url}
              className="flex items-center justify-between p-3 bg-white rounded-lg border 
                       border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{url}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAnalyze(url)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Analyze
                </button>
                <button
                  onClick={() => handleRemove(url)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No competitor URLs saved yet
        </div>
      )}
    </div>
  );
} 