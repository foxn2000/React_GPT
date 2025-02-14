import { Trash2, MessageSquare, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const ChatHistory = ({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  onClearHistory,
  selectedId,
  theme,
  onClose 
}) => {
  return (
<div className={cn(
  "w-80 h-full border-l flex flex-col transition-all duration-300 shadow-xl glass-effect gradient-border",
  theme === "dark" 
    ? "bg-gray-800/90 border-gray-700/50" 
    : "bg-white/90 border-gray-200/50"
)}>
      <div className={cn(
        "p-4 border-b flex justify-between items-center backdrop-blur-sm",
        theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
      )}>
        <h2 className={cn(
          "text-lg font-semibold",
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        )}>
          会話履歴
        </h2>
        <div className="flex gap-2">
<Button
  variant="ghost"
  size="icon"
  className={cn(
    "h-8 w-8 transition-all duration-300 hover:scale-105",
    theme === "dark" 
      ? "hover:bg-gray-700/80 hover:shadow-lg hover:shadow-red-500/10" 
      : "hover:bg-gray-100/80 hover:shadow-md"
  )}
  onClick={onClearHistory}
>
  <Trash2 className="h-5 w-5 text-red-500/70 hover:text-red-500 transition-colors duration-300" />
</Button>
<Button
  variant="ghost"
  size="icon"
  className={cn(
    "h-8 w-8 transition-all duration-300 hover:scale-105",
    theme === "dark" 
      ? "hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-900/10" 
      : "hover:bg-gray-100/80 hover:shadow-md"
  )}
  onClick={onClose}
>
  <X className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
</Button>
        </div>
      </div>
      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-3 space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "p-3 rounded-lg cursor-pointer group flex justify-between items-start hover-lift",
                selectedId === conv.id
                  ? theme === "dark" 
                    ? "bg-gray-700/90 shadow-lg shadow-gray-900/10" 
                    : "bg-gray-100/90 shadow-md"
                  : theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-gray-50/80",
                "transition-all duration-300"
              )}
              onClick={() => onSelectConversation(conv)}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <MessageSquare className={cn(
                  "h-5 w-5 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                  selectedId === conv.id
                    ? "text-blue-500"
                    : theme === "dark" ? "text-gray-400" : "text-gray-500"
                )} />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate transition-colors duration-300",
                    selectedId === conv.id
                      ? theme === "dark" ? "text-blue-400" : "text-blue-600"
                      : theme === "dark" ? "text-gray-200" : "text-gray-700"
                  )}>
                    {conv.title || conv.messages[0]?.content.slice(0, 30) + "..."}
                  </p>
                  <p className={cn(
                    "text-sm truncate",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {new Date(conv.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105",
                    theme === "dark" 
                      ? "hover:bg-gray-600/80 hover:shadow-lg hover:shadow-red-500/10" 
                      : "hover:bg-gray-200/80 hover:shadow-md"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500 transition-colors duration-300" />
                </Button>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className={cn(
              "text-center py-12 px-4",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              履歴はありません
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
