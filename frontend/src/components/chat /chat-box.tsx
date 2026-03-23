import { useState, useRef, useEffect } from "react";
import { chatApi } from "@/services/api-service";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import {
  PaperPlaneTilt,
  User,
  Robot,
  CircleNotch,
  Copy,
  Check,
  Code,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = ["auto", "python", "javascript", "bash"];

interface Message {
  role: "user" | "ai" | "error";
  content: string;
  timestamp: Date;
}

export default function ChatBox() {
  const { user } = useAppStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("auto");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    const userMsg = message.trim();
    setMessage("");
    setIsLoading(true);
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg, timestamp: new Date() }];
    setMessages(newMessages);
    try {
      const fullMsg = language !== "auto" ? `[Execute in ${language}] ${userMsg}` : userMsg;
      const response = await chatApi.send(fullMsg, user?.id || "guest");
      setMessages([...newMessages, { role: "ai", content: response, timestamp: new Date() }]);
    } catch {
      setMessages([...newMessages, { role: "error", content: "Failed to get response. Is the server running?", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-border bg-background/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
            <Robot size={14} weight="duotone" className="text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">AI Chat</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5">
          <Code size={12} weight="regular" className="text-muted-foreground hidden sm:block" />
          <div className="flex gap-0.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-semibold transition-colors capitalize",
                  language === lang
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-4">
              <Robot size={26} weight="duotone" className="text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">How can I help today?</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Ask me anything. I can plan, research, write and execute code in Python, JavaScript, or Bash.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={cn("flex items-start gap-2 group", msg.role === "user" ? "flex-row-reverse" : "")}
            >
              <div className={cn(
                "w-6 sm:w-7 h-6 sm:h-7 rounded-lg flex items-center justify-center shrink-0 border",
                msg.role === "user" ? "bg-primary/15 border-primary/25" : "bg-secondary border-border"
              )}>
                {msg.role === "user"
                  ? <User size={13} weight="duotone" className="text-primary" />
                  : <Robot size={13} weight="duotone" className="text-primary" />
                }
              </div>
              <div className="max-w-[82%] space-y-1">
                <div className={cn(
                  "px-3 py-2.5 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : msg.role === "error"
                    ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-sm"
                    : "bg-secondary text-foreground rounded-tl-sm"
                )}>
                  <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm">{msg.content}</pre>
                </div>
                <div className={cn("flex items-center gap-1.5", msg.role === "user" ? "justify-end" : "")}>
                  <span className="text-[10px] text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <button
                    onClick={() => copyMessage(msg.content, i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    {copiedId === i
                      ? <Check size={12} weight="bold" className="text-emerald-400" />
                      : <Copy size={12} weight="regular" />
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-secondary border border-border flex items-center justify-center">
              <Robot size={13} weight="duotone" className="text-primary" />
            </div>
            <div className="flex gap-1 px-3.5 py-2.5 bg-secondary rounded-2xl rounded-tl-sm">
              {[0, 0.15, 0.3].map((d, i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.75, delay: d }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-2.5 sm:p-3 border-t border-border bg-background/50 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            className="flex-1 min-h-[40px] max-h-[120px] px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none focus:border-primary/60 transition-colors"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Type a message…"
            disabled={isLoading}
            rows={1}
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shrink-0"
            disabled={isLoading || !message.trim()}
          >
            {isLoading
              ? <CircleNotch size={16} className="animate-spin" />
              : <PaperPlaneTilt size={16} weight="duotone" />
            }
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 pl-1 hidden sm:block">Shift+Enter for new line · Enter to send</p>
      </div>
    </div>
  );
}