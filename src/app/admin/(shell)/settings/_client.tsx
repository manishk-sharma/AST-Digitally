"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Settings, 
  Building2, 
  Mail, 
  Server, 
  BarChart3, 
  Shield, 
  Save, 
  Loader2, 
  Eye, 
  EyeOff, 
  LogOut 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { saveSettingByKey, updateAdminCredentials } from "@/app/actions/settings";

interface SettingsClientProps {
  initialSettings: {
    general?: any;
    business?: any;
    contact?: any;
    smtp?: any;
    analytics?: any;
  };
  currentUser: {
    name: string;
    email: string;
  };
}

export default function SettingsClient({ initialSettings, currentUser }: SettingsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "general");
  const [isPending, startTransition] = useTransition();

  // 1. General Settings State
  const [siteTitle, setSiteTitle] = useState(initialSettings.general?.siteTitle || "AST Digitally");
  const [maintenanceMode, setMaintenanceMode] = useState(initialSettings.general?.maintenanceMode || false);
  const [logoUrl, setLogoUrl] = useState(initialSettings.general?.logoUrl || "/AST Logo.png");
  const [faviconUrl, setFaviconUrl] = useState(initialSettings.general?.faviconUrl || "/favicon.ico");

  // 2. Business Info State
  const [companyName, setCompanyName] = useState(initialSettings.business?.companyName || "AST Digitally");
  const [address, setAddress] = useState(initialSettings.business?.address || "D-10, Sector-3, Noida, UP, India");
  const [businessHours, setBusinessHours] = useState(initialSettings.business?.businessHours || "Mon - Fri: 9:00 AM - 6:00 PM");

  // 3. Contact Info State
  const [contactEmail, setContactEmail] = useState(initialSettings.contact?.email || "astdigitally@gmail.com");
  const [contactPhone, setContactPhone] = useState(initialSettings.contact?.phone || "+91 80841 58221");
  const [facebook, setFacebook] = useState(initialSettings.contact?.facebook || "https://facebook.com/astdigitally");
  const [twitter, setTwitter] = useState(initialSettings.contact?.twitter || "https://twitter.com/astdigitally");
  const [instagram, setInstagram] = useState(initialSettings.contact?.instagram || "https://instagram.com/astdigitally");
  const [linkedin, setLinkedin] = useState(initialSettings.contact?.linkedin || "https://linkedin.com/company/astdigitally");
  const [youtube, setYoutube] = useState(initialSettings.contact?.youtube || "");

  // 4. SMTP Config State
  const [smtpHost, setSmtpHost] = useState(initialSettings.smtp?.host || "smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(initialSettings.smtp?.port || "587");
  const [smtpUser, setSmtpUser] = useState(initialSettings.smtp?.username || "");
  const [smtpPass, setSmtpPass] = useState(initialSettings.smtp?.password || "");

  // 5. Analytics Config State
  const [gaId, setGaId] = useState(initialSettings.analytics?.gaId || "");
  const [fbPixelId, setFbPixelId] = useState(initialSettings.analytics?.fbPixelId || "");

  // 6. Security Credentials State
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`/admin/settings?tab=${tab}`);
  };

  const handleSaveSettings = (key: string, data: any) => {
    startTransition(async () => {
      const res = await saveSettingByKey(key, data);
      if (res.success) {
        toast.success("Settings saved successfully.");
      } else {
        toast.error(res.error || "Failed to save settings.");
      }
    });
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    startTransition(async () => {
      const res = await updateAdminCredentials({
        name,
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined
      });

      if (res.success) {
        toast.success("Security credentials updated.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        if (res.requiresLogout) {
          toast.info("Password changed. Logging out in 2 seconds...");
          setTimeout(() => {
            signOut({ callbackUrl: "/admin/login" });
          }, 2000);
        }
      } else {
        toast.error(res.error || "Failed to update security credentials.");
      }
    });
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "business", label: "Business Info", icon: Building2 },
    { id: "contact", label: "Contact Info", icon: Mail },
    { id: "smtp", label: "SMTP Server", icon: Server },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "security", label: "Security & Login", icon: Shield },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar navigation */}
      <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl p-4 border border-gray-100 h-fit space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#3B5BFF]/10 text-[#3B5BFF] font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Settings panel */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
        {isPending && (
          <div className="mb-4 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-2 animate-pulse">
            <Loader2 size={14} className="animate-spin" />
            <span>Saving settings...</span>
          </div>
        )}

        {/* ── GENERAL SETTINGS ── */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
              <p className="text-xs text-gray-400">Configure global website name, logo, and page statuses.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Site Title</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Logo URL</label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Favicon URL</label>
                  <input
                    type="text"
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-gray-700">Maintenance Mode</p>
                  <p className="text-[10px] text-gray-400">Show a placeholder countdown instead of the normal website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:width-4 after:transition-all peer-checked:bg-[#3B5BFF] w-10"></div>
                </label>
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings("general_settings", { siteTitle, logoUrl, faviconUrl, maintenanceMode })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Save General Settings
            </button>
          </div>
        )}

        {/* ── BUSINESS INFO ── */}
        {activeTab === "business" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
              <p className="text-xs text-gray-400">Manage your company legal name, location, and operations.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Corporate Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Business Hours</label>
                <input
                  type="text"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings("business_info", { companyName, address, businessHours })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Save Business Info
            </button>
          </div>
        )}

        {/* ── CONTACT & SOCIAL LINKS ── */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Contact & Social Information</h3>
              <p className="text-xs text-gray-400">Control phone, email, and social networks displayed across the site.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Support Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Support Phone</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Facebook Profile</label>
                  <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Twitter / X Profile</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Instagram Profile</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">YouTube Channel</label>
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings("contact_info", { email: contactEmail, phone: contactPhone, facebook, twitter, instagram, linkedin, youtube })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Save Contact & Socials
            </button>
          </div>
        )}

        {/* ── SMTP SERVER CONFIG ── */}
        {activeTab === "smtp" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">SMTP Server Configuration</h3>
              <p className="text-xs text-gray-400">Configure email relay details for forwarding leads and alerts.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">SMTP Host</label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">SMTP Port</label>
                  <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">SMTP Username</label>
                  <input
                    type="text"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">SMTP Password</label>
                  <input
                    type="password"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings("smtp_config", { host: smtpHost, port: smtpPort, username: smtpUser, password: smtpPass })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Save SMTP Details
            </button>
          </div>
        )}

        {/* ── ANALYTICS ID CONFIG ── */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Analytics Configurations</h3>
              <p className="text-xs text-gray-400">Add tracking pixels and webmasters tags dynamically.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Google Analytics Measure ID (G-XXXXXXX)</label>
                <input
                  type="text"
                  value={gaId}
                  onChange={(e) => setGaId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="G-..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Facebook Pixel ID</label>
                <input
                  type="text"
                  value={fbPixelId}
                  onChange={(e) => setFbPixelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  placeholder="1234567890..."
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings("analytics_config", { gaId, fbPixelId })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Save Analytics IDs
            </button>
          </div>
        )}

        {/* ── SECURITY & SECURITY CREDENTIALS ── */}
        {activeTab === "security" && (
          <form onSubmit={handleSecuritySave} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Security & Credentials</h3>
              <p className="text-xs text-gray-400">Change your administrator login username, email, and password.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email / Username</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 space-y-4">
                <h4 className="text-xs font-bold text-gray-900">Change Password (leave blank to keep current)</h4>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#3B5BFF] outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3B5BFF] rounded-xl hover:bg-[#2d4cef] transition-colors cursor-pointer"
            >
              <Save size={15} /> Update Credentials
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
