import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { checkSession, logout, User } from "@/lib/api";
import AuthPage from "@/pages/AuthPage";
import ChatsPage from "@/pages/ChatsPage";
import ContactsPage from "@/pages/ContactsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import GalleryPage from "@/pages/GalleryPage";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "contacts" | "gallery" | "settings" | "profile";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "chats", label: "Чаты", icon: "MessageCircle" },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "gallery", label: "Галерея", icon: "Image" },
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("chats");

  useEffect(() => {
    checkSession().then((res) => {
      if (res.user) setUser(res.user);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setActiveTab("chats");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Toaster />
        <AuthPage onAuth={setUser} />
      </>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "chats": return <ChatsPage />;
      case "contacts": return <ContactsPage />;
      case "gallery": return <GalleryPage />;
      case "settings": return <SettingsPage />;
      case "profile": return <ProfilePage user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto relative">
      <Toaster />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>

      <nav className="bg-white border-t border-border px-2 py-2 flex items-center justify-around shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-200 ${activeTab === tab.id ? "bg-primary/10" : ""}`}>
              <Icon name={tab.icon} size={22} />
            </div>
            <span className={`text-[10px] font-medium transition-all ${activeTab === tab.id ? "opacity-100" : "opacity-60"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
