import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ApiKeyAlert() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md animate-fade-in">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">API Key Required</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                To test this application, you need to:
              </p>
              <ol className="list-decimal ml-4 mt-1 space-y-1">
                <li>Get an API key from Serpstack</li>
                <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in the root directory</li>
                <li>Add your API key: <code className="bg-yellow-100 px-1 rounded">SERPSTACK_API_KEY=your_api_key_here</code></li>
              </ol>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setIsVisible(false)}
                className="text-sm text-yellow-800 hover:text-yellow-900 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 