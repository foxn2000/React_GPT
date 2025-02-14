import { useState, useRef, useEffect } from 'react';
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizontal, Paperclip } from "lucide-react";
import { cn } from "../lib/utils";

const ChatInput = ({ onSendMessage, isLoading, theme }) => {
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
      onSendMessage(message.trim());
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
    "flex items-end gap-2 p-4 border-t transition-colors duration-300 shadow-inner glass-effect",
    theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
  )}
>
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="メッセージを入力... (Shift + Enter で改行)"
          disabled={isLoading}
          className={cn(
            "min-h-[50px] max-h-[200px] resize-none pr-12 transition-colors duration-300",
            theme === "dark" 
              ? "bg-gray-800 border-gray-700 focus:border-gray-600" 
              : "bg-white focus:border-gray-300",
            "placeholder:text-gray-400"
          )}
        />
<Button
  size="icon"
  variant="ghost"
  className={cn(
    "absolute right-2 bottom-2 h-8 w-8 opacity-50 hover:opacity-100 transition-opacity",
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
  )}
  disabled={isLoading}
>
  <Paperclip className="h-5 w-5" />
</Button>
      </div>
<Button
  type="submit"
  disabled={!message.trim() || isLoading}
  className={cn(
    "h-10 px-4 transition-all duration-300 shadow-md",
    message.trim() && !isLoading
      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      : theme === "dark" ? "bg-gray-700" : "bg-gray-200",
    "disabled:opacity-50"
  )}
>
  <SendHorizontal className={cn(
    "h-6 w-6 transition-transform duration-300",
    message.trim() && !isLoading && "group-hover:translate-x-1"
  )} />
</Button>
    </form>
  );
};

export default ChatInput;
