import React from 'react';
import { Download, Sparkles, TrendingUp, Target } from 'lucide-react';
import type { Keyword } from '../types';

interface ResultsTableProps {
  keywords: Keyword[];
  onExport: () => void;
}

export function ResultsTable({ keywords, onExport }: ResultsTableProps) {
  const sortedKeywords = React.useMemo(() => {
    return [...keywords].sort((a, b) => b.priorityScore - a.priorityScore);
  }, [keywords]);

  // Get top keywords for different strategies
  const topKeywords = React.useMemo(() => {
    const seoKeywords = sortedKeywords
      .filter(kw => kw.difficulty < 70)
      .slice(0, 3);
    
    const seaKeywords = sortedKeywords
      .filter(kw => kw.searchVolume > 20000)
      .slice(0, 3);
    
    const longTailKeywords = sortedKeywords
      .filter(kw => kw.keyword.split(' ').length >= 3)
      .slice(0, 3);

    return { seoKeywords, seaKeywords, longTailKeywords };
  }, [sortedKeywords]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Recommendations Section */}
      <div className="p-6 border-b border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SEO Recommendations */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Top SEO Keywords</h3>
            </div>
            <ul className="space-y-2">
              {topKeywords.seoKeywords.map(kw => (
                <li key={kw.keyword} className="text-sm text-blue-800">
                  • {kw.keyword} <span className="text-blue-600">(Difficulty: {kw.difficulty})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SEA Recommendations */}
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Top SEA Keywords</h3>
            </div>
            <ul className="space-y-2">
              {topKeywords.seaKeywords.map(kw => (
                <li key={kw.keyword} className="text-sm text-purple-800">
                  • {kw.keyword} <span className="text-purple-600">(Volume: {kw.searchVolume.toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long-tail Recommendations */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Long-tail Opportunities</h3>
            </div>
            <ul className="space-y-2">
              {topKeywords.longTailKeywords.map(kw => (
                <li key={kw.keyword} className="text-sm text-green-800">
                  • {kw.keyword} <span className="text-green-600">(Score: {kw.priorityScore})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          All Keywords ({keywords.length})
        </h2>
        <button
          onClick={onExport}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      
      {/* Keywords Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Search Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedKeywords.map((keyword) => (
              <tr key={keyword.keyword} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {keyword.keyword}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.searchVolume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className={`mr-2 ${keyword.difficulty < 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {keyword.difficulty}
                    </span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          keyword.difficulty < 70 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${keyword.difficulty}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.competition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`font-medium ${
                    keyword.priorityScore >= 90 ? 'text-green-600' :
                    keyword.priorityScore >= 80 ? 'text-blue-600' :
                    'text-gray-600'
                  }`}>
                    {keyword.priorityScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}