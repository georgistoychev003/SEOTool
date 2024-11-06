import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { UrlInput } from './components/UrlInput';
import { ResultsTable } from './components/ResultsTable';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeUrl } from './services/api';
import type { AnalysisResult } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CompetitorUrls } from './components/CompetitorUrls';
import { ApiKeyAlert } from './components/ApiKeyAlert';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const handleAnalyze = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await analyzeUrl(url);
      setResult(result);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while analyzing the URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!result) return;

    const headers = ['Keyword', 'Search Volume', 'Difficulty', 'Competition', 'Priority Score'];
    const rows = result.keywords.map(kw => [
      kw.keyword,
      kw.searchVolume,
      kw.difficulty,
      kw.competition,
      kw.priorityScore
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `innoworks-keywords-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ApiKeyAlert />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-75" />
              <div className="relative bg-white rounded-full p-4 shadow-2xl">
                <Sparkles className="w-10 h-10 text-indigo-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
            Innoworks Keyword Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unlock powerful keyword insights for your website with our advanced analysis tool. 
            Get comprehensive data on search volumes, competition, and optimization opportunities.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto">
          <div className="w-full bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          <CompetitorUrls onAnalyze={handleAnalyze} />

          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={() => setError(null)} 
            />
          )}

          {result && (
            <div className="w-full">
              <div className="mb-6 flex items-center justify-between bg-white/50 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="space-y-1">
                  <h2 className="font-medium text-gray-900">Analysis Results</h2>
                  <p className="text-sm text-gray-500">
                    for <span className="font-medium text-gray-700">{result.url}</span>
                    <span className="mx-2">•</span>
                    Last updated: <span className="font-medium text-gray-700">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
                <ErrorBoundary>
                  <ResultsTable keywords={result.keywords} onExport={handleExport} />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;