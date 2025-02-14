import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateChatResponse } from '../services/openai';
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

const ChatWindow = ({ theme }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    // 少し遅延を入れてスクロールを確実にする
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const updatedMessages = [...messages, userMessage];
    const response = await generateChatResponse(updatedMessages);

    if (response.success) {
      setMessages(prev => [...prev, response.data]);
    } else {
      setError('メッセージの送信中にエラーが発生しました。もう一度お試しください。');
    }

    setIsLoading(false);
  };

  return (
    <Card className={cn(
      "flex flex-col h-[calc(100vh-12rem)] overflow-hidden transition-colors duration-300",
      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
    )}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              theme={theme}
              isLast={index === messages.length - 1} 
            />
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mx-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
        theme={theme}
      />
    </Card>
  );
};

export default ChatWindow;
