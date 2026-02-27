/* ALTER AI — BotBuilder.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Create/manage bots with model, persona, knowledge base config
 */

import { useState } from "react";
import { Bot, Plus, Trash2, Edit3, Zap, Globe, Lock, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BOT_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-bot-card-gqPYG2oSAJUqk3fTw5neVp.webp";

interface BotConfig {
  id: string;
  name: string;
  model: string;
  persona: string;
  status: "active" | "paused" | "draft";
  messages: number;
  public: boolean;
}

const initialBots: BotConfig[] = [
  { id: "1", name: "Sales Assistant", model: "gpt-4o", persona: "You are a friendly sales assistant...", status: "active", messages: 1240, public: true },
  { id: "2", name: "Support Bot", model: "gpt-4o-mini", persona: "You are a helpful support agent...", status: "active", messages: 980, public: false },
  { id: "3", name: "Lead Qualifier", model: "gpt-4o", persona: "You qualify leads by asking key questions...", status: "paused", messages: 340, public: false },
  { id: "4", name: "Onboarding Guide", model: "claude-3-sonnet", persona: "You guide new users through onboarding...", status: "active", messages: 2100, public: true },
];

const models = ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo", "claude-3-sonnet", "claude-3-haiku", "gemini-pro"];

export default function BotBuilder() {
  const [bots, setBots] = useState<BotConfig[]>(initialBots);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [newBot, setNewBot] = useState({ name: "", model: "gpt-4o", persona: "", public: false });

  const filtered = bots.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  const createBot = () => {
    if (!newBot.name.trim()) { toast.error("Bot name is required"); return; }
    const bot: BotConfig = {
      id: Date.now().toString(),
      name: newBot.name,
      model: newBot.model,
      persona: newBot.persona || "You are a helpful AI assistant.",
      status: "draft",
      messages: 0,
      public: newBot.public,
    };
    setBots(prev => [bot, ...prev]);
    setNewBot({ name: "", model: "gpt-4o", persona: "", public: false });
    setCreating(false);
    toast.success(`Bot "${bot.name}" created!`);
  };

  const deleteBot = (id: string) => {
    setBots(prev => prev.filter(b => b.id !== id));
    toast.success("Bot deleted");
  };

  const toggleStatus = (id: string) => {
    setBots(prev => prev.map(b => b.id === id
      ? { ...b, status: b.status === "active" ? "paused" : "active" }
      : b
    ));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Bot Builder</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage your AI bots</p>
        </div>
        <Button
          onClick={() => setCreating(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" /> New Bot
        </Button>
      </div>

      {/* Create Bot Panel */}
      {creating && (
        <div className="alter-card p-6 border-primary/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Configure New Bot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">Bot Name</label>
              <input
                type="text"
                value={newBot.name}
                onChange={e => setNewBot(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Customer Support Bot"
                className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">AI Model</label>
              <select
                value={newBot.model}
                onChange={e => setNewBot(p => ({ ...p, model: e.target.value }))}
                className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground border border-border focus:outline-none focus:border-primary transition-colors"
              >
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">System Prompt / Persona</label>
              <textarea
                value={newBot.persona}
                onChange={e => setNewBot(p => ({ ...p, persona: e.target.value }))}
                placeholder="You are a helpful AI assistant that..."
                rows={4}
                className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newBot.public}
                  onChange={e => setNewBot(p => ({ ...p, public: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
              </label>
              <span className="text-sm text-muted-foreground">Make bot publicly accessible</span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={createBot} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create Bot
            </Button>
            <Button variant="ghost" onClick={() => setCreating(false)} className="text-muted-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search bots..."
          className="w-full bg-input rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors max-w-sm"
        />
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(bot => (
          <div key={bot.id} className="alter-card p-5 flex flex-col gap-4 hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary/10">
                  <img src={BOT_AVATAR} alt={bot.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>{bot.name}</p>
                  <p className="text-xs text-muted-foreground">{bot.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {bot.public ? <Globe className="w-3.5 h-3.5 text-muted-foreground" /> : <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{bot.persona}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {bot.messages.toLocaleString()} msgs
                </span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${
                  bot.status === "active" ? "bg-green-500/10 text-green-400"
                  : bot.status === "paused" ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {bot.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStatus(bot.id)}
                  className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  title={bot.status === "active" ? "Pause" : "Activate"}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteBot(bot.id)}
                  className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Bot className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-sm">No bots found. Create your first bot!</p>
          </div>
        )}
      </div>
    </div>
  );
}
