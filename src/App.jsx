import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "./lib/utils";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={cn(
              "text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
              theme === "dark" && "from-blue-400 to-purple-400"
            )}>
              AI Chat Assistant
            </h1>
            <p className={cn(
              "mt-2 text-gray-600",
              theme === "dark" && "text-gray-400"
            )}>
              GPT-4-miniを使用したインテリジェントチャットボット
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "rounded-full w-10 h-10",
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
        <ChatWindow theme={theme} />
      </div>
    </div>
  );
}

export default App;
