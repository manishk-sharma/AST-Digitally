'use client';

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
        <AlertTriangle size={24} />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-semibold text-gray-900">Something went wrong</h3>
        <p className="text-xs text-gray-500">
          An error occurred while loading this page. Please try refreshing or contact support if the issue persists.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#3B5BFF] hover:bg-[#2d4cef] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
