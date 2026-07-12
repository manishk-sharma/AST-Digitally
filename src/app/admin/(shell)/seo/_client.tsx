"use client";

import { useState, useTransition } from "react";
import { Search, Globe, Eye, Save, RotateCcw, AlertTriangle, ArrowRight, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { updateSeoConfig } from "@/app/actions/seo";
import type { SeoConfig } from "@prisma/client";

interface Props {
  initialConfigs: SeoConfig[];
}

const PAGES = [
  "Homepage",
  "Services",
  "About",
  "Case Studies",
  "Careers",
  "Contact",
];

export default function SEOClient({ initialConfigs }: Props) {
  const [configs, setConfigs] = useState<SeoConfig[]>(initialConfigs);
  const [search, setSearch] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonical, setCanonical] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [robots, setRobots] = useState("index, follow");
  const [schemaJson, setSchemaJson] = useState("");

  const filtered = PAGES.filter(p => p.toLowerCase().includes(search.toLowerCase()));

  const handleEditClick = (pageName: string) => {
    setSelectedPage(pageName);
    const existing = configs.find(c => c.page === pageName);

    setMetaTitle(existing?.metaTitle || "");
    setMetaDesc(existing?.metaDesc || "");
    setKeywords(existing?.keywords ? existing.keywords.join(", ") : "");
    setCanonical(existing?.canonical || "");
    setOgImage(existing?.ogImage || "");
    setTwitterCard((existing?.schema as any)?.twitterCard || "summary_large_image");
    setRobots((existing?.schema as any)?.robots || "index, follow");
    
    const rawSchema = (existing?.schema as any)?.jsonLd;
    setSchemaJson(rawSchema ? JSON.stringify(rawSchema, null, 2) : "");
  };

  const handleSave = (publish = false) => {
    if (!selectedPage) return;

    let parsedSchema = {};
    if (schemaJson.trim()) {
      try {
        parsedSchema = JSON.parse(schemaJson);
      } catch {
        toast.error("Invalid Structured Data JSON-LD format.");
        return;
      }
    }

    startTransition(async () => {
      const keywordsArray = keywords
        .split(",")
        .map(k => k.trim())
        .filter(k => k.length > 0);

      const payload = {
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        canonical: canonical || null,
        keywords: keywordsArray,
        ogImage: ogImage || null,
        schema: {
          twitterCard,
          robots,
          jsonLd: parsedSchema,
        },
      };

      const res = await updateSeoConfig(selectedPage, payload);
      if (res.success) {
        toast.success(publish ? "SEO metadata published successfully!" : "SEO settings saved.");
        
        // Update local state
        setConfigs(prev => {
          const index = prev.findIndex(c => c.page === selectedPage);
          if (index > -1) {
            const updated = [...prev];
            updated[index] = res.data as SeoConfig;
            return updated;
          }
          return [...prev, res.data as SeoConfig];
        });

        if (publish) {
          setSelectedPage(null);
        }
      } else {
        toast.error(res.error || "Failed to save SEO config.");
      }
    });
  };

  const handleReset = () => {
    if (!selectedPage) return;
    setMetaTitle("");
    setMetaDesc("");
    setKeywords("");
    setCanonical("");
    setOgImage("");
    setTwitterCard("summary_large_image");
    setRobots("index, follow");
    setSchemaJson("");
    toast.info("Fields reset to defaults.");
  };

  return (
    <div className="space-y-6">
      {/* Search and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/10 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
        {/* Pages Table */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden h-fit shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Page</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Meta Title</th>
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((pageName) => {
                const config = configs.find(c => c.page === pageName);
                const isConfigured = !!config?.metaTitle;
                return (
                  <tr key={pageName} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">{pageName}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                      {config?.metaTitle || "Not configured"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        isConfigured 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}>
                        {isConfigured ? "Customized" : "Default"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditClick(pageName)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          selectedPage === pageName
                            ? "bg-[#3B5BFF] text-white border-[#3B5BFF]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        Edit SEO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SEO Sidebar Editor Panel */}
        {selectedPage && (
          <div className="w-full lg:w-[480px] shrink-0 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg space-y-6 h-fit max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900">SEO Configuration</h3>
                <p className="text-xs text-gray-400">Editing tags for {selectedPage}</p>
              </div>
              <button 
                onClick={() => setSelectedPage(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Meta Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="e.g. AST Digitally — AI Growth Partner"
                />
                <span className="text-[10px] text-gray-400 float-right mt-1">{metaTitle.length}/60 chars</span>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="Summarize the page content for search rankings..."
                />
                <span className="text-[10px] text-gray-400 float-right mt-1">{metaDesc.length}/160 chars</span>
              </div>

              {/* Keywords */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="comma, separated, tags"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={canonical}
                  onChange={(e) => setCanonical(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="https://astdigitally.com/example"
                />
              </div>

              {/* Open Graph Image */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Open Graph Image (OG Image)</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="/images/og-home.jpg"
                />
              </div>

              {/* Robots & Twitter */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Robots Tags</label>
                  <select
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#3B5BFF]"
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Twitter Card</label>
                  <select
                    value={twitterCard}
                    onChange={(e) => setTwitterCard(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#3B5BFF]"
                  >
                    <option value="summary_large_image">summary_large_image</option>
                    <option value="summary">summary</option>
                  </select>
                </div>
              </div>

              {/* Structured Data (JSON-LD) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Structured Schema (JSON-LD)</label>
                <textarea
                  rows={4}
                  value={schemaJson}
                  onChange={(e) => setSchemaJson(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebPage"\n}`}
                />
              </div>

              {/* Preview Box (Mock Google Card) */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Google Snippet Preview</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-[#1a0dab] text-sm hover:underline font-medium truncate">
                    {metaTitle || "AST Digitally — AI-First Digital Growth Partner"}
                  </p>
                  <p className="text-[#006621] text-[10px] truncate">
                    {canonical || `https://astdigitally.com/${selectedPage.toLowerCase()}`}
                  </p>
                  <p className="text-[#545454] text-[11px] leading-relaxed line-clamp-2 mt-1">
                    {metaDesc || "Transform your business with AI-powered digital solutions. We build intelligent web experiences, custom ML models, and data-driven growth strategies..."}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-50 justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} /> Reset
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSave(false)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Save size={12} /> Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(true)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3B5BFF] hover:bg-[#2d4cef] rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Publish <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
