import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { User, Bot, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import ReactMarkdown from 'react-markdown';
import { AVAILABLE_MODELS } from "../services/openai";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message, theme, isLast }) => {
  const isUser = message.role === 'user';
  const avatarBg = isUser ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-green-500 to-teal-500';

  return (
<div className={cn(
  "flex gap-4 p-4 rounded-lg transition-all duration-300 animate-slideIn hover-lift",
  isUser 
    ? theme === "dark" 
      ? "bg-gray-700/40 hover:bg-gray-700/50" 
      : "bg-gray-50/80 hover:bg-gray-50"
    : "bg-transparent",
  isLast && "animate-highlight"
)}>
<Avatar className={cn(
  "w-12 h-12 ring-2 transition-all duration-300 glow",
  isUser 
    ? "ring-blue-500/50 hover:ring-blue-400" 
    : "ring-green-500/50 hover:ring-green-400",
  theme === "dark" 
    ? "shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30" 
    : "hover:shadow-lg"
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
  "p-4 transition-all duration-300 shadow-md gradient-border relative",
  theme === "dark" 
    ? isUser 
      ? "bg-gray-800/90 hover:bg-gray-800 border-gray-700" 
      : "bg-gray-800/50 hover:bg-gray-800/60 border-gray-700" 
    : isUser 
      ? "bg-white/90 hover:bg-white" 
      : "bg-white/50 hover:bg-white/60"
)}>
          {!isUser && message.model && (
            <div className={cn(
              "absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300",
              theme === "dark"
                ? "bg-gray-700/80 text-gray-300 border border-gray-600"
                : "bg-gray-100/80 text-gray-600 border border-gray-200"
            )}>
              <Sparkles className="w-3 h-3" />
              {AVAILABLE_MODELS[message.model]}
            </div>
          )}
          <ReactMarkdown
            className={cn(
              "prose max-w-none break-words",
              theme === "dark" ? "prose-invert" : "",
              "prose-pre:p-0 prose-p:leading-relaxed prose-headings:font-semibold"
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
          "text-xs mt-2 opacity-60 transition-opacity group-hover:opacity-100",
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        )}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
