import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateChatResponse as generateOpenAIResponse } from '../services/openai';
import { generateChatResponse as generateGroqResponse } from '../services/groq';
import { generateChatResponse as generateGeminiResponse } from '../services/gemini';
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

const ChatWindow = ({ theme, selectedConversation, onNewConversation, onUpdateConversation }) => {
  const [messages, setMessages] = useState(selectedConversation?.messages || []);
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
    // 会話が選択されたら、そのメッセージを表示
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
      setError(null);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // 少し遅延を入れてスクロールを確実にする
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSendMessage = async (content, model) => {
    let generateResponse;
    if (model.startsWith('gpt-')) {
      generateResponse = generateOpenAIResponse;
    } else if (model === 'llama-3.3-70b-versatile') {
      generateResponse = generateGroqResponse;
    } else if (model === 'gemini-2.0-flash') {
      generateResponse = generateGeminiResponse;
    } else {
      generateResponse = generateOpenAIResponse; // デフォルト
    }
    const userMessage = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    const response = await generateResponse(updatedMessages, model);

    if (response.success) {
      const aiResponse = {
        ...response.data,
        model: model // Add model information to the message
      };
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      // 会話を保存
      if (selectedConversation) {
        onUpdateConversation(finalMessages);
      } else {
        onNewConversation(finalMessages);
      }
    } else {
      setError('メッセージの送信中にエラーが発生しました。もう一度お試しください。');
      setMessages(updatedMessages); // エラー時は元のメッセージを保持
    }

    setIsLoading(false);
  };

  return (
<Card className={cn(
  "flex flex-col h-full overflow-hidden transition-all duration-300 shadow-xl glass-effect gradient-border",
  theme === "dark" ? "bg-gray-800/90 border-gray-700" : "bg-white/90"
)}>
<ScrollArea className="flex-1 p-4 space-y-4 custom-scrollbar">
<div className="space-y-6 px-2">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              theme={theme}
              isLast={index === messages.length - 1} 
            />
          ))}
          {isLoading && (
            <div className="flex justify-center py-6">
              <div className="relative">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <div className="absolute inset-0 animate-pulse bg-blue-500/10 rounded-full blur-xl" />
              </div>
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mx-4 animate-slideIn">
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
