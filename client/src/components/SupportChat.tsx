/* ALTER AI — SupportChat.tsx
 * Floating support chat widget
 * Design: Ink & Signal — dark panel with indigo accent
 */

import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm ALTER AI support. How can I help you today?",
    sender: "bot",
    time: "now",
  },
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: "Thanks for reaching out! Our team will get back to you shortly. In the meantime, check out our documentation for quick answers.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 z-50 flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 8px 40px oklch(0.58 0.22 265 / 20%)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border-b border-border">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>ALTER Support</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.sender === "user" && "flex-row-reverse")}>
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  msg.sender === "bot"
                    ? "bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground"
                )}>
                  <p>{msg.text}</p>
                  <p className={cn("text-[10px] mt-1", msg.sender === "bot" ? "text-muted-foreground" : "text-primary-foreground/70")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-border">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={sendMessage}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 transition-all z-50"
        style={{ boxShadow: "0 4px 20px oklch(0.58 0.22 265 / 40%)" }}
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </>
  );
}
