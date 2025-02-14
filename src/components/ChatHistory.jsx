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
      "w-80 h-full border-l flex flex-col transition-colors duration-300",
      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className={cn(
        "p-4 border-b flex justify-between items-center",
        theme === "dark" ? "border-gray-700" : "border-gray-200"
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
              "h-8 w-8",
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
            onClick={onClearHistory}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "p-3 rounded-lg cursor-pointer group flex justify-between items-start",
                selectedId === conv.id
                  ? theme === "dark" 
                    ? "bg-gray-700" 
                    : "bg-gray-100"
                  : theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-gray-50",
                "transition-colors duration-200"
              )}
              onClick={() => onSelectConversation(conv)}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <MessageSquare className={cn(
                  "h-5 w-5 mt-1 flex-shrink-0",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )} />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
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
                  "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                  theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className={cn(
              "text-center py-8",
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
