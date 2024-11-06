import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-3xl bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-700 hover:text-red-900"
      >
        ×
      </button>
    </div>
  );
}