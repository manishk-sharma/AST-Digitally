import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#3B5BFF]" />
        <p className="text-xs text-gray-400 font-medium">Loading content...</p>
      </div>
    </div>
  );
}
