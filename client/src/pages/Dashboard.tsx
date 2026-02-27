/* ALTER AI — Dashboard.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Stats overview + AI Guided Prompts + recent activity
 */

import { useState } from "react";
import { Bot, Zap, TrendingUp, Users, MessageSquare, ArrowUpRight, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DASH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-dashboard-preview-4YdNA65jtoppWKcKNHShmU.webp";

const chartData = [
  { day: "Mon", messages: 420, users: 38 },
  { day: "Tue", messages: 580, users: 52 },
  { day: "Wed", messages: 490, users: 44 },
  { day: "Thu", messages: 720, users: 67 },
  { day: "Fri", messages: 860, users: 81 },
  { day: "Sat", messages: 640, users: 59 },
  { day: "Sun", messages: 910, users: 94 },
];

const stats = [
  { label: "Active Bots", value: "12", change: "+3", up: true, icon: Bot },
  { label: "Messages Today", value: "4,821", change: "+18%", up: true, icon: MessageSquare },
  { label: "Monthly Revenue", value: "$3,240", change: "+12%", up: true, icon: TrendingUp },
  { label: "Active Users", value: "847", change: "+24%", up: true, icon: Users },
];

const recentBots = [
  { name: "Sales Assistant", status: "active", messages: 1240, model: "GPT-4o" },
  { name: "Support Bot", status: "active", messages: 980, model: "GPT-4o-mini" },
  { name: "Lead Qualifier", status: "paused", messages: 340, model: "GPT-4o" },
  { name: "Onboarding Guide", status: "active", messages: 2100, model: "Claude 3" },
];

const promptSuggestions = [
  "Help me build a customer support bot for my e-commerce store",
  "Create a lead qualification bot that integrates with my CRM",
  "Design an onboarding assistant for new SaaS users",
  "Build a FAQ bot trained on my documentation",
];

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePrompt = (text?: string) => {
    const query = text || prompt;
    if (!query.trim()) return;
    setLoading(true);
    setPrompt(query);
    setTimeout(() => {
      setAiResponse(
        `Great idea! Here's how to build a "${query.slice(0, 40)}..." bot:\n\n1. **Define the bot's purpose** — Set a clear system prompt and persona.\n2. **Configure knowledge base** — Upload relevant documents or URLs.\n3. **Set up conversation flows** — Use the Bot Logic Engine to handle edge cases.\n4. **Add voice (optional)** — Enable TTS/STT in Bot Voice settings.\n5. **Test & deploy** — Use the Export tool to embed or publish your bot.\n\nHead to the Bot Builder to get started!`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
            Good morning, Alex
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your bots today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Plan</p>
            <p className="text-sm font-semibold text-accent" style={{ fontFamily: "'Syne', sans-serif" }}>Pro</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            A
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="alter-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="stat-number text-3xl">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3 text-accent" />
                <span className="text-xs text-accent font-medium">{stat.change}</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + AI Prompt */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="alter-card p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              Message Volume — Last 7 Days
            </h2>
            <span className="text-xs text-muted-foreground">Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.58 0.22 265)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.58 0.22 265)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "oklch(0.11 0.012 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: "8px", color: "oklch(0.92 0.008 80)" }}
                cursor={{ stroke: "oklch(0.58 0.22 265)", strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="messages" stroke="oklch(0.58 0.22 265)" strokeWidth={2} fill="url(#msgGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Guided Prompts */}
        <div className="alter-card p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              AI Assistant
            </h2>
          </div>

          {aiResponse ? (
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="text-sm text-muted-foreground bg-secondary rounded-lg p-3 whitespace-pre-line leading-relaxed">
                {aiResponse}
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-2 mb-4">
              <p className="text-xs text-muted-foreground mb-3">Try a suggestion:</p>
              {promptSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handlePrompt(s)}
                  className="w-full text-left text-xs text-muted-foreground bg-secondary hover:bg-secondary/80 hover:text-foreground rounded-lg px-3 py-2.5 transition-colors border border-transparent hover:border-border"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePrompt()}
              placeholder="Ask AI to help build a bot..."
              className="flex-1 bg-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              size="sm"
              onClick={() => handlePrompt()}
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-3"
            >
              {loading ? <Zap className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          {aiResponse && (
            <button
              onClick={() => { setAiResponse(""); setPrompt(""); }}
              className="text-xs text-muted-foreground hover:text-foreground mt-2 text-center transition-colors"
            >
              Clear & start over
            </button>
          )}
        </div>
      </div>

      {/* Recent Bots */}
      <div className="alter-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Recent Bots</h2>
          <a href="/bots" className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="divide-y divide-border">
          {recentBots.map((bot, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{bot.name}</p>
                <p className="text-xs text-muted-foreground">{bot.model}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{bot.messages.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">messages</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                bot.status === "active"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-muted text-muted-foreground"
              }`}>
                {bot.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
