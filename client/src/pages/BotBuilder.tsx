/* ALTER AI — BotBuilder.tsx
 * Design: Premium 2025 SaaS
 * Create/manage bots with model, persona, knowledge base config
 * Data: Real Supabase integration
 */

import { useState, useEffect } from "react";
import { Bot, Plus, Trash2, Edit3, Zap, Globe, Lock, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBots } from "@/hooks/useBots";

const models = ["GPT-4o", "GPT-4o-mini", "GPT-3.5-turbo", "Claude 3 Sonnet", "Claude 3 Haiku", "Gemini Pro"];

export default function BotBuilder() {
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [newBot, setNewBot] = useState({ name: "", model: "GPT-4o", persona: "", is_public: false });
  const [userId] = useState("demo-user-123"); // In production, get from auth context

  const { bots, loading, error, fetchBots, createBot: createBotAPI, updateBot, deleteBot: deleteBotAPI } = useBots();

  useEffect(() => {
    fetchBots(userId);
  }, [userId, fetchBots]);

  const filtered = bots.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  const handleCreateBot = async () => {
    if (!newBot.name.trim()) {
      toast.error("Bot name is required");
      return;
    }

    try {
      await createBotAPI(userId, {
        name: newBot.name,
        model: newBot.model,
        persona: newBot.persona || "You are a helpful AI assistant.",
        is_public: newBot.is_public,
        description: "",
        status: "active",
        messages_count: 0,
        user_id: userId,
      } as any);
      setNewBot({ name: "", model: "GPT-4o", persona: "", is_public: false });
      setCreating(false);
      toast.success(`Bot "${newBot.name}" created!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create bot");
    }
  };

  const handleDeleteBot = async (botId: string, botName: string) => {
    try {
      await deleteBotAPI(botId);
      toast.success(`Bot "${botName}" deleted`);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete bot");
    }
  };

  const handleToggleStatus = async (botId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await updateBot(botId, { status: newStatus as any });
      toast.success(`Bot ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update bot");
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gradient-to-b from-[#F4EFE6] to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bot Builder</h1>
          <p className="text-gray-600 text-sm mt-1">Create and manage your AI bots</p>
        </div>
        <Button
          onClick={() => setCreating(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Bot
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Create Bot Panel */}
      {creating && (
        <div className="card-premium p-8 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Configure New Bot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Bot Name</label>
              <input
                type="text"
                value={newBot.name}
                onChange={e => setNewBot(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Customer Support Bot"
                className="w-full bg-white rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">AI Model</label>
              <select
                value={newBot.model}
                onChange={e => setNewBot(p => ({ ...p, model: e.target.value }))}
                className="w-full bg-white rounded-lg px-4 py-3 text-sm text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">System Prompt / Persona</label>
              <textarea
                value={newBot.persona}
                onChange={e => setNewBot(p => ({ ...p, persona: e.target.value }))}
                placeholder="You are a helpful AI assistant that..."
                rows={4}
                className="w-full bg-white rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newBot.is_public}
                  onChange={e => setNewBot(p => ({ ...p, is_public: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
              </label>
              <span className="text-sm text-gray-600">Make bot publicly accessible</span>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <Button onClick={handleCreateBot} className="btn-primary">
              Create Bot
            </Button>
            <Button variant="outline" onClick={() => setCreating(false)} className="btn-secondary">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search bots..."
          className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      {/* Bots Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(bot => (
            <div key={bot.id} className="card-premium p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{bot.name}</p>
                    <p className="text-xs text-gray-500">{bot.model}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {bot.is_public ? (
                    <Globe className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{bot.persona}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {(bot.messages_count || 0).toLocaleString()} msgs
                  </span>
                  <span className={`px-2 py-1 rounded-full font-medium text-xs ${
                    bot.status === "active" ? "bg-teal-100 text-teal-700"
                    : "bg-gray-100 text-gray-600"
                  }`}>
                    {bot.status === "active" ? "● Active" : "● Paused"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStatus(bot.id, bot.status)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    title={bot.status === "active" ? "Pause" : "Activate"}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBot(bot.id, bot.name)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Bot className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">
                {bots.length === 0 ? "No bots yet. Create your first bot!" : "No bots match your search."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
