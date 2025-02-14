import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatHistory from './components/ChatHistory';
import { Button } from "./components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { loadFromLocalStorage, saveToLocalStorage, deleteConversation, clearLocalStorage } from './lib/storage';
import { cn } from "./lib/utils";

function App() {
  const [theme, setTheme] = useState("light");
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
    
    // Load saved conversations
    const savedConversations = loadFromLocalStorage();
    setConversations(savedConversations);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleNewConversation = (messages) => {
    const newConversation = {
      id: Date.now().toString(),
      messages,
      timestamp: new Date().toISOString(),
    };
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    saveToLocalStorage(updatedConversations);
    setSelectedConversation(newConversation);
  };

  const handleUpdateConversation = (messages) => {
    if (!selectedConversation) return;
    
    const updatedConversation = {
      ...selectedConversation,
      messages,
      timestamp: new Date().toISOString(),
    };

    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    );

    setConversations(updatedConversations);
    saveToLocalStorage(updatedConversations);
    setSelectedConversation(updatedConversation);
  };

  const handleDeleteConversation = (id) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    saveToLocalStorage(updatedConversations);
    if (selectedConversation?.id === id) {
      setSelectedConversation(null);
    }
    deleteConversation(id);
  };

  const handleClearHistory = () => {
    setConversations([]);
    setSelectedConversation(null);
    clearLocalStorage();
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="flex h-screen">
        {/* サイドパネル（lg以上で常に表示、それ以下では条件付き表示） */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300",
          isHistoryOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <ChatHistory
            conversations={conversations}
            onSelectConversation={setSelectedConversation}
            onDeleteConversation={handleDeleteConversation}
            onClearHistory={handleClearHistory}
            selectedId={selectedConversation?.id}
            theme={theme}
            onClose={() => setIsHistoryOpen(false)}
          />
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex justify-between items-center p-4 border-b transition-colors duration-300">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden",
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                )}
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className={cn(
                  "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                  theme === "dark" && "from-blue-400 to-purple-400"
                )}>
                  AI Chat Assistant
                </h1>
                <p className={cn(
                  "text-sm text-gray-600",
                  theme === "dark" && "text-gray-400"
                )}>
                  GPT-4-miniを使用したインテリジェントチャットボット
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full w-9 h-9",
                theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "hover:bg-gray-100"
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </header>
          <div className="flex-1 min-h-0">
            <ChatWindow 
              theme={theme} 
              selectedConversation={selectedConversation}
              onNewConversation={handleNewConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
