import { useState, useRef, useEffect } from 'react';
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { cn } from "../lib/utils";
import { AVAILABLE_MODELS } from "../services/openai";

const ChatInput = ({ onSendMessage, isLoading, theme }) => {
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim(), selectedModel);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
<form 
  onSubmit={handleSubmit}
  className={cn(
    "flex flex-col gap-2 p-4 border-t transition-all duration-300 shadow-inner glass-effect",
    theme === "dark" 
      ? "border-gray-700/50 bg-gray-800/50 shadow-gray-900/20" 
      : "border-gray-200/50 bg-gray-50/50 shadow-gray-200/50"
  )}
>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(AVAILABLE_MODELS).map(([value, label]) => (
          <Button
            key={value}
            type="button"
            disabled={isLoading}
            onClick={() => setSelectedModel(value)}
            className={cn(
              "transition-all duration-300 shadow-lg rounded-xl whitespace-nowrap",
              selectedModel === value
                ? theme === "dark"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : theme === "dark"
                  ? "bg-gray-800/90 border-gray-700/50 text-gray-300 hover:bg-gray-700"
                  : "bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-100",
              "disabled:opacity-50"
            )}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="メッセージを入力... (Shift + Enter で改行)"
          disabled={isLoading}
          className={cn(
            "min-h-[50px] max-h-[200px] resize-none transition-all duration-300 rounded-xl",
            theme === "dark" 
              ? "bg-gray-800/90 border-gray-700/50 focus:border-gray-600 focus:bg-gray-800 focus:shadow-lg focus:shadow-blue-500/10" 
              : "bg-white/90 focus:border-gray-300 focus:bg-white focus:shadow-lg focus:shadow-blue-500/5",
            "placeholder:text-gray-400 placeholder:transition-opacity placeholder:duration-300 focus:placeholder:opacity-50"
          )}
        />
      </div>
      <Button
  type="submit"
  disabled={!message.trim() || isLoading}
  className={cn(
    "h-[50px] px-4 transition-all duration-300 shadow-lg rounded-xl group",
    message.trim() && !isLoading
      ? theme === "dark"
        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-500/20 hover:scale-105 text-white"
        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/20 hover:scale-105 text-white"
      : theme === "dark" 
        ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
        : "bg-gray-200 hover:bg-gray-300 text-gray-600",
    "disabled:opacity-50 disabled:hover:scale-100"
  )}
>
  <SendHorizontal className={cn(
    "h-6 w-6 transition-all duration-300",
    message.trim() && !isLoading && "group-hover:translate-x-1 group-hover:scale-110"
  )} />
</Button>
      </div>
    </form>
  );
};

export default ChatInput;
