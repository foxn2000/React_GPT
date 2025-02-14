import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { User, Bot } from "lucide-react";
import { cn } from "../lib/utils";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message, theme, isLast }) => {
  const isUser = message.role === 'user';
  const avatarBg = isUser ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-green-500 to-teal-500';

  return (
    <div className={cn(
      "flex gap-4 p-4 rounded-lg transition-all duration-300 animate-slideIn",
      isUser ? theme === "dark" ? "bg-gray-700/50" : "bg-gray-50" : "bg-transparent",
      isLast && "animate-highlight"
    )}>
      <Avatar className={cn(
        "w-10 h-10 ring-2 transition-shadow duration-300",
        isUser ? "ring-blue-500/50" : "ring-green-500/50",
        theme === "dark" ? "shadow-lg shadow-blue-500/20" : ""
      )}>
        <AvatarFallback className={avatarBg}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <Card className={cn(
          "p-4 transition-colors duration-300",
          theme === "dark" 
            ? isUser ? "bg-gray-800 border-gray-700" : "bg-gray-800/50 border-gray-700" 
            : isUser ? "bg-white" : "bg-white/50"
        )}>
          <ReactMarkdown
            className={cn(
              "prose max-w-none break-words",
              theme === "dark" ? "prose-invert" : "",
              "prose-pre:p-0"
            )}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={theme === "dark" ? oneDark : oneLight}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={cn(
                    "px-1 py-0.5 rounded-md",
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  )} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </Card>
        <div className={cn(
          "text-xs",
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        )}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
