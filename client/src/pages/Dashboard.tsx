/* ALTER AI Dashboard
 * Premium 2025 SaaS Redesign
 * Focus: Bot building, clean stats, AI guided prompts
 * Design: Warm beige, purple primary, clean minimal
 */

import { useState } from "react";
import { Bot, Zap, TrendingUp, Users, MessageSquare, ArrowUpRight, Send, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "wouter";

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
  { label: "Messages This Week", value: "5,420", change: "+18%", up: true, icon: MessageSquare },
  { label: "Total Users", value: "847", change: "+24%", up: true, icon: Users },
  { label: "Avg. Rating", value: "4.8", change: "+0.2", up: true, icon: TrendingUp },
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
    <div className="min-h-screen bg-gradient-to-b from-[#F4EFE6] to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Good morning, Alex
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your bots today.</p>
          </div>
          <Link href="/bots">
            <Button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Bot
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card-premium p-6 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-teal-600">{stat.change}</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Chart + Recent Bots */}
          <div className="lg:col-span-2 space-y-8">
            {/* Messages Chart */}
            <div className="card-premium p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Messages This Week</h2>
                <p className="text-gray-600 text-sm mt-1">Total conversations across all bots</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorMessages)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Bots */}
            <div className="card-premium p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Bots</h2>
                <Link href="/bots">
                  <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">View All →</button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentBots.map((bot, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{bot.name}</p>
                        <p className="text-xs text-gray-500">{bot.model}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{bot.messages.toLocaleString()}</p>
                      <p className={`text-xs font-medium ${bot.status === 'active' ? 'text-teal-600' : 'text-gray-500'}`}>
                        {bot.status === 'active' ? '● Active' : '● Paused'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Guided Prompts */}
          <div className="card-premium p-8 space-y-6 h-fit sticky top-24">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">AI Guide</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Tell me what kind of bot you want to build, and I'll guide you through the process.
            </p>

            {/* Prompt Input */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePrompt()}
                  placeholder="Describe your bot idea..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <button
                  onClick={() => handlePrompt()}
                  disabled={loading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions */}
              {!aiResponse && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Suggestions</p>
                  {promptSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePrompt(suggestion)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-lg text-sm text-gray-700 hover:text-purple-700 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* AI Response */}
              {aiResponse && (
                <div className="p-4 bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                  <button
                    onClick={() => { setAiResponse(""); setPrompt(""); }}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700"
                  >
                    ← Ask something else
                  </button>
                </div>
              )}

              {loading && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    <p className="text-sm text-purple-700">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
