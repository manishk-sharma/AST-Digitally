import type { Metadata } from "next";

export const metadata: Metadata = { title: "Media Library" };

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
        <p className="text-sm text-gray-500">Manage images, videos, and documents.</p>
      </div>
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center hover:border-[#3B5BFF]/40 transition-colors cursor-pointer">
        <div className="text-5xl mb-4">📁</div>
        <p className="text-sm font-semibold text-gray-700">Drag & drop files here</p>
        <p className="text-xs text-gray-400 mt-1">or click to browse — PNG, JPG, SVG, PDF, MP4</p>
        <p className="text-xs text-gray-300 mt-3">Connect Cloudinary to enable media uploads</p>
      </div>
    </div>
  );
}
